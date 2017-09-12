export default (obj, sortType, lToG, searchTerm) => {
  const sort = (lToG ? ['<', sortType] : ['>', sortType]).join('.');
  if (!obj.posts) return obj;
  let sortedPosts = Object.entries(obj.posts).sort(sortTypes[sortType]);
  sortedPosts = lToG ? sortedPosts : sortedPosts.reverse();
  //sortedPosts = searchTerm ? searchSort(sortedPosts, searchTerm) : sortedPosts;
  sortedPosts = sortedPosts.reduce((posts, post) => {
    posts[post[0]] = post[1];
    return posts;
  }, {});
  return {...obj, posts: sortedPosts, postsSort: [lToG ? 'Least' : 'Most', sortType]};
}

const searchSort = (posts, term, results = []) => {
  // posts = posts.slice();
  // if(term.length <= 0) {
  //   return [...results, ...posts];
  // }
  // posts = posts.reduce((noMatch, post, i) => {
  //   if (post[1].!!!!!!.slice(0, term.length) === term) {
  //     results.push(post);
  //     return noMatch;
  //   }
  //   return [...noMatch, post]
  // }, []);
  // return searchSort(posts, term.slice(0, -1), results);
}

const likeSort = (post1, post2) => {
  return post1[1].likes - post2[1].likes;
}

const createdSort = (post1, post2) => {
  return post1[1].timeStamp - post2[1].timeStamp;
}

const popularSort = (post1, post2) => {
  return post1[1].likes - post2[1].likes;
}

const trendingSort = (post1, post2) => {
  const post1Rank = Math.log(10, post1[1].likes + (post1[1].timeStamp)/45000);
  const post2Rank = Math.log(10, post2[1].likes + (post2[1].timeStamp)/45000);
  return post1Rank - post2Rank;
}

const sortTypes = {
  likeSort,
  createdSort,
  popularSort,
  trendingSort,
}
