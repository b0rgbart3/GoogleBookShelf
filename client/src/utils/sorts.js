

function compareTitleDes(a,b) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
        comparison = 1;
    } else if (titleA < titleB) {
        comparison= -1;
    }
    return comparison;
}
function compareTitleAsc(a,b) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA < titleB) {
        comparison = 1;
    } else if (titleA > titleB) {
        comparison= -1;
    }
    return comparison;
}
function comparePublishedDateDes(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.band.toUpperCase();
    // const bandB = b.band.toUpperCase();
    const dateA = parseInt(a.publishedDate);
    const dateB = parseInt(b.publishedDate);
  
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }
  
  function comparePublishedDateAsc(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.band.toUpperCase();
    // const bandB = b.band.toUpperCase();
    const dateA = parseInt(a.publishedDate);
    const dateB = parseInt(b.publishedDate);
  
    let comparison = 0;
    if (dateA < dateB) {
      comparison = 1;
    } else if (dateA > dateB) {
      comparison = -1;
    }
    return comparison;
  }
  

export function sortByPublishedDateDes(results) {
    console.log(results);
    return [...results].sort(comparePublishedDateDes);
    
}

export function sortByPublishedDateAsc(results) {
    console.log(results);
    return [...results].sort(comparePublishedDateAsc);
    
}

export function sortByTitleDes(results) {
    return [...results].sort(compareTitleDes);
}

export function sortByTitleAsc(results) {
    return [...results].sort(compareTitleAsc);
}
