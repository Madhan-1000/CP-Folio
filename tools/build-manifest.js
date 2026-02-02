const fs = require('fs').promises;
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CODE_ROOT = path.join(ROOT, 'CP-CODE');
const OUTPUT = path.join(ROOT, 'data', 'manifest.json');
const CODE_ROOT_REL = 'CP-CODE';

const relFromRoot = target => path.relative(path.join(ROOT, CODE_ROOT_REL), target).replace(/\\/g, '/');

const readDirSafe = async dir => {
    try {
        return await fs.readdir(dir, { withFileTypes: true });
    } catch (err) {
        return [];
    }
};

const listProblems = async dir => {
    const entries = await readDirSafe(dir);
    return entries
        .filter(ent => ent.isFile() && ent.name !== 'meta.json')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(ent => {
            const filePath = path.join(dir, ent.name);
            return {
                path: relFromRoot(filePath),
                label: ent.name,
                snippet: '',
            };
        });
};

const buildSections = async subDir => {
    const base = path.join(CODE_ROOT, subDir);
    const sections = await readDirSafe(base);
    const folders = sections.filter(ent => ent.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

    const results = [];
    for (const folder of folders) {
        const folderAbs = path.join(base, folder.name);
        const folderRel = relFromRoot(folderAbs);
        const metaPath = path.join(folderAbs, 'meta.json');
        const problems = await listProblems(folderAbs);
        results.push({
            title: folder.name,
            folder: folderRel,
            meta: relFromRoot(metaPath),
            problems,
        });
    }
    return results;
};

const buildManifest = async () => {
    const practiceDir = path.join(CODE_ROOT, 'PRACTISE');
    const practice = await listProblems(practiceDir);

    const contests = await buildSections('CONTESTS');
    const sprints = await buildSections('SPRINTS');
    const virtual = await buildSections('VIRTUAL-CONTESTS');

    const manifest = { practice, contests, sprints, virtual };
    await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
    await fs.writeFile(OUTPUT, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

    const counts = {
        practice: practice.length,
        contests: contests.reduce((n, s) => n + s.problems.length, 0),
        sprints: sprints.reduce((n, s) => n + s.problems.length, 0),
        virtual: virtual.reduce((n, s) => n + s.problems.length, 0),
    };
    console.log('Manifest written to data/manifest.json');
    console.log('Counts:', counts);
};

buildManifest().catch(err => {
    console.error('Failed to build manifest:', err);
    process.exit(1);
});
