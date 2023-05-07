const useNode = () => {
  const insertNode = function (tree, commentId, item, authtoken, authname, authemail) {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
        author: authtoken,
        authorName: authname,
        authorEmail: authemail,
        likes: 0,
        dislikes: 0,
        likers  : {},
        dislikers: {},
        flagged: false,
        last_updated: new Date()
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item, authtoken, authname, authemail);
    });

    return { ...tree, items: latestNode };
  };

  const editNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value;
      tree.likes = 0;
      tree.dislikes = 0;
      tree.likers = {};
      tree.dislikers = {};
      tree.last_updated = new Date();
      return tree;
    }

    tree.items.map((ob) => {
      return editNode(ob, commentId, value);
    });

    return { ...tree };
  };

  const likeNode = (tree, commentId, email) => {
    if (tree.id === commentId) {
      if(email in tree.likers){
        if(tree.likers[email] === true) {
          tree.likes -= 1;
          tree.likers[email]=false;
          return tree;
        }
      }
      tree.likes += 1;
      tree.likers[email]=true;
      if(email in tree.dislikers){
        if(tree.dislikers[email] === true) {
          tree.dislikes -= 1;
          tree.dislikers[email]=false;
        }
      }
      return tree;
    }

    tree.items.map((ob) => {
      return likeNode(ob, commentId, email);
    });

    return { ...tree };
  };

  const dislikeNode = (tree, commentId, email) => {
    if (tree.id === commentId) {
      if(email in tree.dislikers){
        if(tree.dislikers[email] === true) {
          tree.dislikes -= 1;
          tree.dislikers[email]=false;
          return tree;
        }
      }
      tree.dislikes += 1;
      tree.dislikers[email]=true;
      if(email in tree.likers){
        if(tree.likers[email] === true) {
          tree.likes -= 1;
          tree.likers[email]=false;
        }
      }
      return tree;
    }

    tree.items.map((ob) => {
      return dislikeNode(ob, commentId, email);
    });

    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode, likeNode, dislikeNode};
};

export default useNode;
