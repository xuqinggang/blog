Array.prototype.quickSort = function() {
    const l = this.length
    if(l < 2) return this
    const basic = this[0], left = [], right = []
    for(let i = 1; i < l; i++) {
      const iv = this[i]
      iv >= basic && right.push(iv) // to avoid repeatly element.
      iv < basic && left.push(iv)
    }
    return left.quickSort().concat(basic, right.quickSort())
}
const arr = [5, 3, 7, 4, 1, 9, 8, 6, 2];
const ascendArr = arr.quickSort()
console.log(ascendArr);