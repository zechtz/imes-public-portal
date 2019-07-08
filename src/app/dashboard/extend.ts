declare global {
  interface Array<T> {
    chunkInto(value): this;
  }
}


Object.defineProperty(Array.prototype, 'chunkInto', {
  value: function(chunkSize) {
    var array = this;
    return [].concat.apply([],
      array.map(function(elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }
});

export {};
