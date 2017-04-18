export function getUniqueElmtList(array: any[]) {
    let list: string[] = [];
    array.forEach(element => {
      if (list.indexOf(element) === -1) {
        list.push(element)
      }
    });
    return list;
  }

  export function updateAndfilterUniqueItems(array: any) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].id === a[j].id) {
          a[i] = a[j];
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }

  export function findDuplicates(a, a2, key) {
    console.log('entro en findDuplicates');
    var map1 = {};
    a.forEach(i => map1[key(i)] = i);
    return a2.filter(i2 => map1[key(i2)] ? i2 : false);
}
