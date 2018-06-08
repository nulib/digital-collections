export function getItem(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        id
          ? resolve({
              response: {
                docs: [
                  {
                    id: '5cd66892-6e63-4476-bd3e-f295355d0302',
                    title_tesim: ['Berkeley Image 4']
                  }
                ]
              }
            })
          : reject({
              response: {
                docs: []
              }
            })
    );
  });
}
