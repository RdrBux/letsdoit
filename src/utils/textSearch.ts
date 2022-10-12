function getTagsByWord(nameArr: string[]) {
  const name = nameArr.join(' ');
  const tagsArr = [];
  if (name.length < 3) {
    tagsArr.push(name);
    return tagsArr;
  }
  let currTag = name.slice(0, 2);
  for (let i = 2; i < name.length; i++) {
    currTag += name[i];
    tagsArr.push(currTag);
  }
  return tagsArr;
}

function permutator(inputArr: string[]): any[] {
  let result: string[] = [];

  const permute = (arr: string[], m: any = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
}

export function generateTags(fullname: string) {
  const name = fullname.split(' ');
  const permutations = permutator(name);
  const tags: any = [];
  permutations.forEach((permutation) => tags.push(getTagsByWord(permutation)));

  return tags.flat();
}
