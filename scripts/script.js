//-------------------------------------------------
//-------------------------------------------------
// Config + manifest loader (dynamic instead of hardcoded lists)
const isInPages = window.location.pathname.includes('/pages/');
const CONFIG_URL = isInPages ? '../data/config.json' : './data/config.json';
const MANIFEST_URL = isInPages ? '../data/manifest.json' : './data/manifest.json';
const pageTitle = document.body?.dataset?.pageTitle || 'CP-Folio';
const PATH_PREFIX = isInPages ? '../' : './';

let codeRoot = 'CP-CODE';

const applyConfig = config => {
    const baseName = config.name || 'CP-Folio';
    document.title = `${pageTitle} | ${baseName}`;

    const footer = document.getElementById('footer-text');
    const titleName = document.getElementById('username_ind');
    if (titleName) {
        titleName.textContent = `${baseName} | CP-Folio`;
    }
    if (footer) {
        footer.textContent = `© ${new Date().getFullYear()} ${baseName}`;
    }

    const cfLink = document.getElementById('cf-profile-link');
    if (cfLink && config.codeforces_account) {
        cfLink.href = config.codeforces_account;
    }

    if (config.color) {
        const root = document.documentElement;
        root.style.setProperty('--accent', config.color);
        root.style.setProperty('--accent-2', config.color);
        root.style.setProperty('--primary', config.color);
        root.style.setProperty('--secondary', config.color);
    }

    codeRoot = config.codeRoot || codeRoot;
};

const loadConfig = () => fetch(CONFIG_URL)
    .then(res => res.json())
    .then(cfg => { applyConfig(cfg); return cfg; })
    .catch(() => {
        const footer = document.getElementById('footer-text');
        if (footer) {
            footer.textContent = `© ${new Date().getFullYear()} CP-Folio`;
        }
        return { codeRoot };
    });

const loadManifest = () => fetch(MANIFEST_URL)
    .then(res => (res.ok ? res.json() : null))
    .catch(() => null);
//-------------------------------------------------
//-------------------------------------------------

const isHomePage = pageTitle === 'Home' || !isInPages;
const isViewerPage = pageTitle === 'Viewer';
const isPracticePage = pageTitle === 'Practice';
const isContestPage = pageTitle === 'Contests';
const isSprintPage = pageTitle === 'Sprints';
const isVirtualPage = pageTitle === 'Virtual Contests';
const isSectionPage = pageTitle === 'Section';
const isAllPage = pageTitle === 'All';
// Defaults (used as fallback when manifest is missing)
const defaultData = {
    practiceProblems: [
        'CP-CODE/PRACTISE/hello_world.py',
        'CP-CODE/PRACTISE/array_sum.cpp',
        'CP-CODE/PRACTISE/stack_ops.java',
        'CP-CODE/PRACTISE/hashmap.js',
        'CP-CODE/PRACTISE/prefix_check.ts',
        'CP-CODE/PRACTISE/greedy_walk.go',
    ],
    contestProblems: [
        'CP-CODE/CONTESTS/CONTEST-1/round1_a.py',
        'CP-CODE/CONTESTS/CONTEST-1/round1_b.cpp',
        'CP-CODE/CONTESTS/CONTEST-2/round2_a.rs',
        'CP-CODE/CONTESTS/CONTEST-2/round2_b.kt',
        'CP-CODE/CONTESTS/CONTEST-3/round3_a.cs',
        'CP-CODE/CONTESTS/CONTEST-3/round3_b.swift',
    ],
    sprintProblems: [
        'CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint1_task_a.py',
        'CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint1_task_b.cpp',
        'CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint2_task_a.java',
        'CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint2_task_b.ts',
    ],
    virtualProblems: [
        'CP-CODE/VIRTUAL-CONTESTS/CONTEST-1/virtual1_a.py',
        'CP-CODE/VIRTUAL-CONTESTS/CONTEST-2/virtual2_a.cpp',
        'CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/virtual3_a.go',
    ],
    contestSections: [
        { title: 'CONTEST-1', path: 'CP-CODE/CONTESTS/CONTEST-1/meta.json', folder: 'CP-CODE/CONTESTS/CONTEST-1' },
        { title: 'CONTEST-2', path: 'CP-CODE/CONTESTS/CONTEST-2/meta.json', folder: 'CP-CODE/CONTESTS/CONTEST-2' },
        { title: 'CONTEST-3', path: 'CP-CODE/CONTESTS/CONTEST-3/meta.json', folder: 'CP-CODE/CONTESTS/CONTEST-3' },
    ],
    sprintSections: [
        { title: 'SPRINT-BLOCK-1', path: 'CP-CODE/SPRINTS/SPRINT-BLOCK-1/meta.json', folder: 'CP-CODE/SPRINTS/SPRINT-BLOCK-1' },
        { title: 'SPRINT-BLOCK-2', path: 'CP-CODE/SPRINTS/SPRINT-BLOCK-2/meta.json', folder: 'CP-CODE/SPRINTS/SPRINT-BLOCK-2' },
    ],
    virtualSections: [
        { title: 'VIRTUAL-CONTEST-1', path: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-1/meta.json', folder: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-1' },
        { title: 'VIRTUAL-CONTEST-2', path: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-2/meta.json', folder: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-2' },
        { title: 'VIRTUAL-CONTEST-3', path: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/meta.json', folder: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-3' },
    ],
    practiceList: [
        { path: 'CP-CODE/PRACTISE/hello_world.py', label: 'hello_world.py', snippet: 'Placeholder Python hello world.' },
        { path: 'CP-CODE/PRACTISE/array_sum.cpp', label: 'array_sum.cpp', snippet: 'Sums an array in C++.' },
        { path: 'CP-CODE/PRACTISE/stack_ops.java', label: 'stack_ops.java', snippet: 'Minimal stack check in Java.' },
        { path: 'CP-CODE/PRACTISE/hashmap.js', label: 'hashmap.js', snippet: 'Counts tokens in JavaScript.' },
        { path: 'CP-CODE/PRACTISE/prefix_check.ts', label: 'prefix_check.ts', snippet: 'Prefix check in TypeScript.' },
    ],
    contestList: [
        { path: 'CP-CODE/CONTESTS/CONTEST-3/round3_b.swift', label: 'round3_b.swift', snippet: 'Contest 3 Swift placeholder.' },
        { path: 'CP-CODE/CONTESTS/CONTEST-3/round3_a.cs', label: 'round3_a.cs', snippet: 'Contest 3 C# placeholder.' },
        { path: 'CP-CODE/CONTESTS/CONTEST-2/round2_b.kt', label: 'round2_b.kt', snippet: 'Contest 2 Kotlin placeholder.' },
        { path: 'CP-CODE/CONTESTS/CONTEST-1/round1_a.py', label: 'round1_a.py', snippet: 'Contest 1 Python placeholder.' },
    ],
    virtualList: [
        { path: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-3/virtual3_a.go', label: 'virtual3_a.go', snippet: 'Virtual contest 3 Go placeholder.' },
        { path: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-2/virtual2_a.cpp', label: 'virtual2_a.cpp', snippet: 'Virtual contest 2 C++ placeholder.' },
        { path: 'CP-CODE/VIRTUAL-CONTESTS/CONTEST-1/virtual1_a.py', label: 'virtual1_a.py', snippet: 'Virtual contest 1 Python placeholder.' },
    ],
    sprintList: [
        { path: 'CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint2_task_b.ts', label: 'sprint2_task_b.ts', snippet: 'Sprint block 2 TypeScript placeholder.' },
        { path: 'CP-CODE/SPRINTS/SPRINT-BLOCK-2/sprint2_task_a.java', label: 'sprint2_task_a.java', snippet: 'Sprint block 2 Java placeholder.' },
        { path: 'CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint1_task_b.cpp', label: 'sprint1_task_b.cpp', snippet: 'Sprint block 1 C++ placeholder.' },
        { path: 'CP-CODE/SPRINTS/SPRINT-BLOCK-1/sprint1_task_a.py', label: 'sprint1_task_a.py', snippet: 'Sprint block 1 Python placeholder.' },
    ],
};

let practiceProblems = [...defaultData.practiceProblems];
let contestProblems = [...defaultData.contestProblems];
let sprintProblems = [...defaultData.sprintProblems];
let virtualProblems = [...defaultData.virtualProblems];

let contestSections = [...defaultData.contestSections];
let sprintSections = [...defaultData.sprintSections];
let virtualSections = [...defaultData.virtualSections];

let practiceList = [...defaultData.practiceList];
let contestList = [...defaultData.contestList];
let virtualList = [...defaultData.virtualList];
let sprintList = [...defaultData.sprintList];

const takeFirstN = (arr, n = 4) => arr.slice(0, n);
const normalizePath = path => (path.startsWith('./') ? path.slice(2) : path);
const withBase = path => `${PATH_PREFIX}${normalizePath(path)}`;

const makeViewerLink = path => {
    const clean = normalizePath(path);
    const viewerBase = isInPages ? './viewer.html' : './pages/viewer.html';
    return `${viewerBase}?file=${encodeURIComponent(clean)}`;
};

let allProblems = [
    ...practiceProblems,
    ...contestProblems,
    ...sprintProblems,
    ...virtualProblems,
];

const pathMeta = path => {
    const clean = normalizePath(path).replace(/^CP-CODE\//, '');
    const segments = clean.split('/');
    segments.pop();
    return segments.join(' / ') || 'CP-CODE';
};

const updateStat = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value.toString();
};

const renderProblemCards = (paths, targetId) => {
    const container = document.getElementById(targetId);
    if (!container) return;
    if (!paths.length) {
        container.innerHTML = '<p class="section-lead">No problems yet.</p>';
        return;
    }

    container.innerHTML = paths.map(path => {
        const clean = normalizePath(path);
        const fileName = clean.split('/').pop();
        return `
            <article class="dir-card">
                <div class="dir-card__title">${fileName}</div>
                <div class="dir-card__meta">${pathMeta(path)}</div>
                <a class="button button--ghost" href="${makeViewerLink(clean)}">Open in viewer</a>
            </article>
        `;
    }).join('');
};

const attachSearch = (inputId, paths, targetId, onFilter) => {
    const input = document.getElementById(inputId);
    if (!input) {
        renderProblemCards(paths, targetId);
        if (onFilter) onFilter(paths);
        return;
    }

    const applyFilter = () => {
        const q = input.value.trim().toLowerCase();
        const filtered = q ? paths.filter(p => p.toLowerCase().includes(q)) : paths;
        renderProblemCards(filtered, targetId);
        if (onFilter) onFilter(filtered);
    };

    input.addEventListener('input', applyFilter);
    applyFilter();
};

const loadSectionMeta = items => Promise.all(items.map(item => fetch(withBase(item.path))
    .then(res => res.json())
    .then(meta => ({ ...item, meta, ok: true }))
    .catch(() => ({ ...item, ok: false }))));

const renderSectionCards = (items, targetId) => {
    const container = document.getElementById(targetId);
    if (!container) return;
    if (!items.length) {
        container.innerHTML = '<p class="section-lead">No sections yet.</p>';
        return;
    }

    loadSectionMeta(items).then(entries => {
        container.innerHTML = entries.map(entry => {
            const meta = entry.meta || {};
            const title = meta.title || entry.title;
            const pid = meta.id ? `ID: ${meta.id}` : 'ID: N/A';
            const platform = meta.platform ? meta.platform.toUpperCase() : 'Unknown platform';
            const date = meta.date || 'Date not set';
            const subtitle = `${platform} • ${date}`;
            const sectionLink = `./section.html?folder=${encodeURIComponent(entry.folder)}&title=${encodeURIComponent(title)}`;
            return `
                <article class="dir-card">
                    <div class="dir-card__title">${title}</div>
                    <div class="dir-card__meta">${pid}</div>
                    <div class="dir-card__meta">${subtitle}</div>
                    <a class="button button--ghost" href="${sectionLink}">View problems</a>
                </article>
            `;
        }).join('');
    });
};

const renderList = (items, targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (!items.length) {
        el.innerHTML = '<li><a aria-label="No items"><span class="recent-title">No items yet</span></a></li>';
        return;
    }
    el.innerHTML = items.map(item => `
        <li>
            <a href="${makeViewerLink(item.path)}">
                <span class="recent-title">${item.label}</span>
                <span class="recent-snippet">${item.snippet}</span>
            </a>
        </li>
    `).join('');
};

const ping = path => fetch(withBase(path), { method: 'HEAD' });

const checkExisting = paths => Promise.all(paths.map(p => ping(p)
    .then(() => ({ path: p, exists: true }))
    .catch(() => ({ path: p, exists: false }))));

const filterProblemsByFolder = folder => {
    if (!folder) return [];
    const clean = normalizePath(folder);
    const all = [...practiceProblems, ...contestProblems, ...sprintProblems, ...virtualProblems];
    return all.filter(p => normalizePath(p).startsWith(`${clean}/`));
};

const countIds = [
    'stat-practice-problems',
    'stat-contest-problems',
    'stat-sprint-problems',
    'stat-virtual-problems',
    'stat-total-problems',
    'practice-count',
    'contest-count',
    'sprint-count',
    'virtual-count',
    'all-count',
];

const needsCounts = countIds.some(id => document.getElementById(id));

const chartPalette = ['#e8623d', '#f2c94c', '#4bf3c0', '#7aa2ff', '#a370f7', '#9aa0b5'];

const extLabels = {
    py: 'Python',
    cpp: 'C++',
    cxx: 'C++',
    cc: 'C++',
    c: 'C',
    js: 'JavaScript',
    ts: 'TypeScript',
    java: 'Java',
    kt: 'Kotlin',
    kts: 'Kotlin',
    cs: 'C#',
    go: 'Go',
    rs: 'Rust',
    swift: 'Swift',
};

const qualifyPath = rel => {
    const clean = normalizePath(rel);
    return clean.startsWith(`${codeRoot}/`) ? clean : normalizePath(`${codeRoot}/${clean}`);
};

const fileLabel = path => normalizePath(path).split('/').pop();

const applyManifestData = manifest => {
    if (!manifest) {
        allProblems = [
            ...practiceProblems,
            ...contestProblems,
            ...sprintProblems,
            ...virtualProblems,
        ];
        return;
    }

    const practice = Array.isArray(manifest.practice) ? manifest.practice : [];
    if (practice.length) {
        practiceProblems = practice.map(item => qualifyPath(item.path || item));
        practiceList = practice.map(item => ({
            path: qualifyPath(item.path || item),
            label: item.label || fileLabel(item.path || item),
            snippet: item.snippet || 'Practice placeholder.',
        }));
    }

    const buildSectionData = (sections = []) => sections.map(section => {
        const folder = qualifyPath(section.folder || '');
        const metaPath = section.meta ? qualifyPath(section.meta) : `${folder}/meta.json`;
        const problems = Array.isArray(section.problems) ? section.problems : [];
        const problemPaths = problems.map(p => qualifyPath(p.path || p));
        const listEntries = problems.map(p => ({
            path: qualifyPath(p.path || p),
            label: p.label || fileLabel(p.path || p),
            snippet: p.snippet || 'Problem placeholder.',
        }));
        return {
            title: section.title || folder.split('/').pop(),
            folder,
            path: metaPath,
            problems: problemPaths,
            listEntries,
        };
    });

    const contestData = buildSectionData(manifest.contests);
    if (contestData.length) {
        contestSections = contestData.map(({ title, path, folder }) => ({ title, path, folder }));
        contestProblems = contestData.flatMap(s => s.problems);
        contestList = contestData.flatMap(s => s.listEntries);
    }

    const sprintData = buildSectionData(manifest.sprints);
    if (sprintData.length) {
        sprintSections = sprintData.map(({ title, path, folder }) => ({ title, path, folder }));
        sprintProblems = sprintData.flatMap(s => s.problems);
        sprintList = sprintData.flatMap(s => s.listEntries);
    }

    const virtualData = buildSectionData(manifest.virtual);
    if (virtualData.length) {
        virtualSections = virtualData.map(({ title, path, folder }) => ({ title, path, folder }));
        virtualProblems = virtualData.flatMap(s => s.problems);
        virtualList = virtualData.flatMap(s => s.listEntries);
    }

    // Fall back to defaults when any bucket is empty
    if (!practiceProblems.length) {
        practiceProblems = [...defaultData.practiceProblems];
        practiceList = [...defaultData.practiceList];
    }
    if (!contestProblems.length) {
        contestProblems = [...defaultData.contestProblems];
        contestList = [...defaultData.contestList];
        contestSections = [...defaultData.contestSections];
    }
    if (!sprintProblems.length) {
        sprintProblems = [...defaultData.sprintProblems];
        sprintList = [...defaultData.sprintList];
        sprintSections = [...defaultData.sprintSections];
    }
    if (!virtualProblems.length) {
        virtualProblems = [...defaultData.virtualProblems];
        virtualList = [...defaultData.virtualList];
        virtualSections = [...defaultData.virtualSections];
    }

    allProblems = [
        ...practiceProblems,
        ...contestProblems,
        ...sprintProblems,
        ...virtualProblems,
    ];
};

const buildLangBreakdown = paths => {
    const tally = {};
    paths.forEach(p => {
        const ext = (p.split('.').pop() || '').toLowerCase();
        const label = extLabels[ext] || ext.toUpperCase() || 'Other';
        tally[label] = (tally[label] || 0) + 1;
    });
    return Object.entries(tally).map(([label, count], idx) => ({
        label,
        count,
        color: chartPalette[idx % chartPalette.length],
    }));
};

const renderLangBar = (barId, legendId, breakdown) => {
    const bar = document.getElementById(barId);
    const legend = document.getElementById(legendId);
    if (!bar || !legend) return;
    if (!breakdown.length) {
        bar.innerHTML = '';
        legend.innerHTML = '<li class="lang-empty">No files found.</li>';
        return;
    }

    const total = breakdown.reduce((sum, item) => sum + item.count, 0);
    bar.innerHTML = breakdown.map(item => {
        const pct = (item.count / total) * 100;
        return `<div class="lang-bar__segment" style="width:${pct}%; background:${item.color}" aria-label="${item.label} ${pct.toFixed(1)}%"></div>`;
    }).join('');

    legend.innerHTML = breakdown.map(item => {
        const pct = ((item.count / total) * 100).toFixed(1);
        return `
            <li class="lang-legend__item">
                <span class="lang-swatch" style="background:${item.color}"></span>
                <span>${item.label} ${pct}%</span>
            </li>
        `;
    }).join('');
};

const applyCountsAndLangBars = (practiceExisting, contestExisting, sprintExisting, virtualExisting) => {
    const practiceCount = practiceExisting.length;
    const contestCount = contestExisting.length;
    const sprintCount = sprintExisting.length;
    const virtualCount = virtualExisting.length;
    const total = practiceCount + contestCount + sprintCount + virtualCount;

    if (needsCounts) {
        updateStat('stat-practice-problems', practiceCount);
        updateStat('stat-contest-problems', contestCount);
        updateStat('stat-sprint-problems', sprintCount);
        updateStat('stat-virtual-problems', virtualCount);
        updateStat('stat-total-problems', total);

        updateStat('practice-count', practiceCount);
        updateStat('contest-count', contestCount);
        updateStat('sprint-count', sprintCount);
        updateStat('virtual-count', virtualCount);
        updateStat('all-count', total);
    }

    const overall = [...practiceExisting, ...contestExisting, ...sprintExisting, ...virtualExisting];
    renderLangBar('lang-overall', 'legend-overall', buildLangBreakdown(overall));
    renderLangBar('lang-practice', 'legend-practice', buildLangBreakdown(practiceExisting));
    renderLangBar('lang-contest', 'legend-contest', buildLangBreakdown(contestExisting));
    renderLangBar('lang-sprint', 'legend-sprint', buildLangBreakdown(sprintExisting));
    renderLangBar('lang-virtual', 'legend-virtual', buildLangBreakdown(virtualExisting));
};

const langBarIds = ['lang-overall', 'lang-practice', 'lang-contest', 'lang-sprint', 'lang-virtual', 'section-lang-bar'];
const needsLangBars = langBarIds.some(id => document.getElementById(id));

const runPageSetup = () => {
    if (needsCounts || needsLangBars) {
        Promise.all([
            checkExisting(practiceProblems),
            checkExisting(contestProblems),
            checkExisting(sprintProblems),
            checkExisting(virtualProblems),
        ]).then(([practiceRes, contestRes, sprintRes, virtualRes]) => {
            const practiceExisting = practiceRes.filter(r => r.exists).map(r => r.path);
            const contestExisting = contestRes.filter(r => r.exists).map(r => r.path);
            const sprintExisting = sprintRes.filter(r => r.exists).map(r => r.path);
            const virtualExisting = virtualRes.filter(r => r.exists).map(r => r.path);

            applyCountsAndLangBars(practiceExisting, contestExisting, sprintExisting, virtualExisting);
        });
    }

    if (isSectionPage) {
        const params = new URLSearchParams(window.location.search);
        const folderParam = params.get('folder');
        const displayTitle = params.get('title');
        const folder = folderParam ? normalizePath(folderParam) : '';

        const titleEl = document.getElementById('section-title');
        const subtitleEl = document.getElementById('section-subtitle');

        if (titleEl && displayTitle) titleEl.textContent = displayTitle;
        if (subtitleEl) subtitleEl.textContent = folder ? folder : 'No folder specified';

        const metaPath = folder ? `${folder}/meta.json` : '';
        if (metaPath) {
            fetch(withBase(metaPath))
                .then(res => res.ok ? res.json() : null)
                .then(meta => {
                    if (!meta) return;
                    const metaBits = [];
                    if (meta.title) metaBits.push(meta.title);
                    if (meta.platform) metaBits.push(meta.platform.toUpperCase());
                    if (meta.id) metaBits.push(`ID: ${meta.id}`);
                    if (meta.date) metaBits.push(meta.date);
                    if (titleEl && meta.title) titleEl.textContent = meta.title;
                    if (subtitleEl && metaBits.length) subtitleEl.textContent = metaBits.join(' • ');
                })
                .catch(() => {});
        }

        const sectionProblems = filterProblemsByFolder(folder);
        attachSearch('section-search', sectionProblems, 'section-grid', filtered => {
            updateStat('section-count', filtered.length);
            renderLangBar('section-lang-bar', 'section-lang-legend', buildLangBreakdown(filtered));
        });
    }

    if (isHomePage) {
        renderList(takeFirstN(practiceList), 'recent-practice');
        renderList(takeFirstN(contestList), 'recent-contests');
        renderList(takeFirstN(virtualList), 'recent-virtual');
        renderList(takeFirstN(sprintList), 'recent-sprints');
    }

    if (isPracticePage) {
        attachSearch('practice-search', practiceProblems, 'practice-grid');
    }

    if (isContestPage) {
        renderSectionCards(contestSections, 'contest-section-grid');
        attachSearch('contest-search', contestProblems, 'contest-grid');
    }

    if (isSprintPage) {
        renderSectionCards(sprintSections, 'sprint-section-grid');
        attachSearch('sprint-search', sprintProblems, 'sprint-grid');
    }

    if (isVirtualPage) {
        renderSectionCards(virtualSections, 'virtual-section-grid');
        attachSearch('virtual-search', virtualProblems, 'virtual-grid');
    }

    if (isAllPage) {
        attachSearch('all-search', allProblems, 'all-grid');
    }

    if (isViewerPage) {
        const params = new URLSearchParams(window.location.search);
        const rawFile = params.get('file');
        const filenameEl = document.getElementById('viewer-filename');
        const codeEl = document.getElementById('viewer-code');
        const errorEl = document.getElementById('viewer-error');
        const copyBtn = document.getElementById('copy-btn');

        const showError = msg => {
            if (errorEl) {
                errorEl.textContent = msg;
                errorEl.style.display = 'block';
            }
        };

        const rootPrefix = `${codeRoot}/`;
        if (!rawFile || !(rawFile.startsWith(`./${rootPrefix}`) || rawFile.startsWith(rootPrefix))) {
            if (filenameEl) filenameEl.textContent = 'Invalid file';
            showError('Invalid or missing file parameter.');
        } else {
            const cleanPath = normalizePath(rawFile);
            const fetchPath = `${PATH_PREFIX}${cleanPath}`;
            if (filenameEl) filenameEl.textContent = cleanPath;

            fetch(fetchPath)
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to load file (${res.status})`);
                    return res.text();
                })
                .then(text => {
                    if (codeEl) {
                        codeEl.textContent = text;
                        if (window.hljs) {
                            window.hljs.highlightElement(codeEl);
                        }
                    }
                })
                .catch(err => {
                    showError(err.message);
                });

            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    if (!codeEl) return;
                    navigator.clipboard.writeText(codeEl.textContent || '')
                        .then(() => {
                            copyBtn.textContent = 'Copied';
                            setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
                        })
                        .catch(() => showError('Unable to copy content.'));
                });
            }
        }
    }
};

const start = async () => {
    await loadConfig();
    const manifest = await loadManifest();
    applyManifestData(manifest);
    runPageSetup();
};

start();

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('is-open')) {
                siteNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
