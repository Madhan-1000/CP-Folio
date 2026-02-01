arr=[]
n=int(input())
for x in range(n):
    a=int(input())
    b=int(input())
    arr.append([a,b]) 
for a,b in arr:
    c=[]
    i,j=0,0
    for x in b:
        if x=="a":i+=1
        else:j+=1
        if not c:
            c.append([x,1])
        else:
            if c[-1][0]==x:
                c[-1][-1]+=1
            else:
                c.append([x,1])
    c2=[x[1] for x in c if x[0]=="a"]
    c3=[x[1] for x in c if x[0]=="b"]
    res=0
    while i!=j:
        if i>j:
            v=i-j
            pass