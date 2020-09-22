

function compareTitle(a,b) {
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
function comparePublishedDate(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.band.toUpperCase();
    // const bandB = b.band.toUpperCase();
    const dateA = parseInt(a.publishedDate);
    const dateB = parseInt(b.publishedDate);
  
    console.log("Comparing: ", dateA, " with: ", dateB);
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
      console.log("greater");
    } else if (dateA < dateB) {
      comparison = -1;
      console.log("lesser");
    }
    return comparison;
  }
  


export function sortByPublishedDate(results) {
    console.log(results);
    return [...results].sort(comparePublishedDate);
    
}

export function sortByTitle(results) {
    return [...results].sort(compareTitle);
}


