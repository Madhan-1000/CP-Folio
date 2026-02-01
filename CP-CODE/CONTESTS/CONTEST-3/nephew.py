n=int(input())
for _ in range(n):
    x=int(input())
    print(3-x%3 if x%3!=0 else 0)