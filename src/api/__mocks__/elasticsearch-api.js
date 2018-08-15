export function getItem(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        id
          ? resolve({
              _id: '5cd66892-6e63-4476-bd3e-f295355d0302',
              found: true,
              _source: {
                title: {
                  primary: ['This is the title']
                }
              }
            })
          : reject({
              found: false
            })
    );
  });
}
