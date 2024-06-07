type Entry<T> = [string, T];

class HashTable<T> {
  private size: number;
  private table: any[];

  constructor(size: number) {
    this.size = size;
    this.table = new Array(size);
  }

  hash(key: string) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.size;
  }

  insert(key: string, value: T) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }

    // 이미 존재하는 키인 경우 값을 업데이트합니다.
    const existingEntry : Entry<T> | undefined = this.table[index].find((entry: Entry<T>) => entry[0] === key);

    if (existingEntry) {
      existingEntry[1] = value;
    } else {
      this.table[index].push([key, value]);
    }
  }

  search(key: string) {
    const index = this.hash(key);
    const checkKey = this.table[index];

    if (checkKey) {
      for (let i = 0; i < checkKey.length; i++) {
        // 루프 조건 수정
        if (checkKey[i][0] === key) {
          // 키 비교 수정
          return checkKey[i][1]; // 값 반환 수정
        }
      }
    }
    return undefined; // 해당 키를 찾지 못한 경우 undefined 반환
  }
}

const Hash = () => {
  const hashTable = new HashTable(10);
  hashTable.insert('a', 1);
  hashTable.insert('b', 2);

  return (
    <>
      <h1>{hashTable.search('a')}</h1>
    </>
  );
};

export default Hash;
