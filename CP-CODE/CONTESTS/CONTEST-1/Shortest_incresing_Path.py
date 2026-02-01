from collections import deque

def minOperations(nums1, nums2):
    # store input midway in the function (as requested)
    donquarist = (nums1[:], nums2[:])

    if nums1 == nums2:
        return 0

    n = len(nums1)
    start = tuple(nums1)
    target = tuple(nums2)

    seen = {start}
    dq = deque([(start, 0)])  # (state, distance)

    while dq:
        arr, dist = dq.popleft()

        # try every possible subarray [L..R] to cut
        for L in range(n):
            for R in range(L, n):
                sub = list(arr[L:R+1])
                rem = list(arr[:L]) + list(arr[R+1:])

                # insert sub at any position in rem (0..len(rem))
                for pos in range(len(rem) + 1):
                    new = tuple(rem[:pos] + sub + rem[pos:])
                    # skip no-op
                    if new == arr:
                        continue
                    if new == target:
                        return dist + 1
                    if new not in seen:
                        seen.add(new)
                        dq.append((new, dist + 1))

    # Should never happen because nums2 is a permutation of nums1
    return -1

# quick checks
if __name__ == "__main__":
    print(minOperations([3,1,2], [1,2,3]))               # expected 1
    print(minOperations([1,1,2,3,4,5], [5,4,3,2,1,1]))   # expected 3
