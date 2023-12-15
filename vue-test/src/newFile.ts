import type { IPost } from '@/components/types';
import axios from 'axios';

export default (await import('vue')).defineComponent({
components: {
PostList,
PostForm
},

data() {
return {
posts,
dialogVisible: false,
isPostsLoading: false,
selectedSort,
sortOptions: [
{ value: 'title', name: 'title' },
{ value: 'body', name: 'body' }
],
searchQuery: '',
page: 1,
limit: 10
};
},
computed: {
sortedPosts() {
return [...this.posts].sort((a: IPost, b: IPost) => {
const post1 = a[this.selectedSort];
const post2 = b[this.selectedSort];
return post1?.localeCompare(post2 as string);
});
},
sortedAndSearchedPosts() {
return this.sortedPosts.filter((post) => {
return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
});
}
},

mounted() {
this.fetchPosts();
},

methods: {
createPost(newPost: IPost) {
this.posts.push(newPost);
this.dialogVisible = false;
},
removePost(removingPost: IPost) {
this.posts = this.posts.filter((p) => p.id !== removingPost.id);
},
showDialog() {
this.dialogVisible = true;
},
async fetchPosts() {
try {
this.isPostsLoading = true;
const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
params: {
_page: this.page,
_limit: this.limit
}
});
this.posts = response.data;
} catch (e) {
console.error('fetchPosts', e);
} finally {
this.isPostsLoading = false;
}
},
setSearchQuery() { }
}
});
