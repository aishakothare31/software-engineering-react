import {
    userTogglesTuitDislikes,
    userTogglesTuitLikes,
    findAllTuitsLikedByUser,
    findAllTuitsDislikedByUser,
    userUnlikesTuit
} from "../services/likes-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";
import {
    createTuitByUser,
    deleteTuit,
    findTuitById
} from "../services/tuits-service";

describe('can like a tuit when not already liked or disliked', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;

    beforeEach(async () => {

        dummyUser = await createUser(ripley);
        console.log("dummyUser",dummyUser)

        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);
        console.log("dummyT",dummyTuit)
    })


    afterEach(async () => {
     
        await deleteTuit(dummyTuit._id);

        await deleteUsersByUsername(dummyUser.username)


        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('like tuit when not already liked or disliked', async () => {

        await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);


        const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
        expect(newLikes.length).toEqual(1);

        const newLike = newLikes[0];
        expect(newLike.tuit).toEqual(dummyTuit.tuit);
        expect(newLike.postedBy._id).toEqual(dummyUser.id);


        const likedTuit = await findTuitById(dummyTuit._id);
        expect(likedTuit.stats.likes).toEqual(1);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can like a tuit when already liked', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };


    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;


    beforeEach(async () => {

        dummyUser = await createUser(ripley);

        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

        await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);
    })


    afterEach(async () => {

        await deleteTuit(dummyTuit._id);


        await deleteUsersByUsername(dummyUser.username)


        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('like tuit when already liked', async () => {
        
        await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);


        const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
        expect(newLikes.length).toEqual(0);

  
        const likedTuit = await findTuitById(dummyTuit._id);
        expect(likedTuit.stats.likes).toEqual(0);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can dislike a tuit when not already disliked or liked', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;


    beforeEach(async () => {

        dummyUser = await createUser(ripley);


        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);
    })


    afterEach(async () => {
        
        await deleteTuit(dummyTuit._id);

        await deleteUsersByUsername(dummyUser.username)

    
        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('dislike tuit when not already liked or disliked', async () => {

        await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);

        const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
        expect(newDislikes.length).toEqual(1);

        
        const newDislike = newDislikes[0];
        expect(newDislike.tuit).toEqual(dummyTuit.tuit);
        expect(newDislike.postedBy._id).toEqual(dummyUser.id);

        
        const dislikedTuit = await findTuitById(dummyTuit._id);
        expect(dislikedTuit.stats.likes).toEqual(0);
        expect(dislikedTuit.stats.dislikes).toEqual(1);
    });
});

describe('can dislike a tuit when already disliked', () => {
  
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };


    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;

    beforeEach(async () => {

        dummyUser = await createUser(ripley);

     
        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);


        await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);
    })


    afterEach(async () => {
        
        await deleteTuit(dummyTuit._id);

        
        await deleteUsersByUsername(dummyUser.username)

       
        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('dislike tuit when already disliked', async () => {
       
        await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);

      
        const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
        expect(newDislikes.length).toEqual(0);

        const dislikedTuit = await findTuitById(dummyTuit._id);
        expect(dislikedTuit.stats.likes).toEqual(0);
        expect(dislikedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can like a tuit when already disliked', () => {
   
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    
    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;

 
    beforeEach(async () => {
       
        dummyUser = await createUser(ripley);

       
        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

        await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);
    })

   
    afterEach(async () => {
       
        await deleteTuit(dummyTuit._id);

       
        await deleteUsersByUsername(dummyUser.username)

       
        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('like tuit when already disliked', async () => {
       
        await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);


        const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
        expect(newDislikes.length).toEqual(0);

        const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
        expect(newLikes.length).toEqual(1);


        const newLike = newLikes[0];
        expect(newLike.tuit).toEqual(dummyTuit.tuit);
        expect(newLike.postedBy._id).toEqual(dummyUser.id);

        const likedTuit = await findTuitById(dummyTuit._id);
        expect(likedTuit.stats.likes).toEqual(1);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can dislike a tuit when already liked', () => {
  
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };


    const newTuit = {
        tuit: 'Ellen Ripley dummy tuit'
    };

    let dummyUser;
    let dummyTuit;

  
    beforeEach(async () => {
     
        dummyUser = await createUser(ripley);

      
        dummyTuit = await createTuitByUser(dummyUser.id, newTuit);

        await userTogglesTuitLikes(dummyUser.id, dummyTuit._id);
    })

   
    afterEach(async () => {
       
        await deleteTuit(dummyTuit._id);

      
        await deleteUsersByUsername(dummyUser.username)

      
        await userUnlikesTuit(dummyUser.id, dummyTuit._id)
    })

    test('dislike tuit when already liked', async () => {
     
        await userTogglesTuitDislikes(dummyUser.id, dummyTuit._id);


        const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
        expect(newDislikes.length).toEqual(1);
     
        const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
        expect(newLikes.length).toEqual(0);


        const newDislike = newDislikes[0];
        expect(newDislike.tuit).toEqual(dummyTuit.tuit);
        expect(newDislike.postedBy._id).toEqual(dummyUser.id);


        const likedTuit = await findTuitById(dummyTuit._id);
        expect(likedTuit.stats.likes).toEqual(0);
        expect(likedTuit.stats.dislikes).toEqual(1);
    });
});

describe('can find my liked tuits', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };


    const newTuit = [
        {
            tuit: 'Ellen Ripley dummy tuit'
        },
        {
            tuit: 'dummy tuit'
        },
        {
            tuit: 'another dummy tuit'
        }
    ];

    let dummyUser;
    let dummyTuit1;
    let dummyTuit2;
    let dummyTuit3;

   
    beforeEach(async () => {
        
        dummyUser = await createUser(ripley);

       
        dummyTuit1 = await createTuitByUser(dummyUser.id, newTuit[0]);
        dummyTuit2 = await createTuitByUser(dummyUser.id, newTuit[1]);
        dummyTuit3 = await createTuitByUser(dummyUser.id, newTuit[2]);
    })


    afterEach(async () => {
       
        await deleteTuit(dummyTuit1._id);
        await deleteTuit(dummyTuit2._id);
        await deleteTuit(dummyTuit3._id);

       
        await deleteUsersByUsername(dummyUser.username);

        await userUnlikesTuit(dummyUser.id, dummyTuit1._id);
        await userUnlikesTuit(dummyUser.id, dummyTuit2._id);
        await userUnlikesTuit(dummyUser.id, dummyTuit3._id);
    })

    test('can find my liked tuits', async () => {
      
        await userTogglesTuitLikes(dummyUser.id, dummyTuit1._id);
        await userTogglesTuitLikes(dummyUser.id, dummyTuit3._id);

       
        const newLikes = await findAllTuitsLikedByUser(dummyUser.id);
        expect(newLikes.length).toEqual(2);


        const newLike1 = newLikes[0];
        expect(newLike1.tuit).toEqual(dummyTuit1.tuit);
        expect(newLike1.postedBy._id).toEqual(dummyUser.id);
 
        const likedTuit1 = await findTuitById(dummyTuit1._id);
        expect(likedTuit1.stats.likes).toEqual(1);
        expect(likedTuit1.stats.dislikes).toEqual(0);


        const newLike2 = newLikes[1];
        expect(newLike2.tuit).toEqual(dummyTuit3.tuit);
        expect(newLike2.postedBy._id).toEqual(dummyUser.id);
      
        const likedTuit2 = await findTuitById(dummyTuit3._id);
        expect(likedTuit2.stats.likes).toEqual(1);
        expect(likedTuit2.stats.dislikes).toEqual(0);
    });
});

describe('can find my disliked tuits', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };


    const newTuit = [
        {
            tuit: 'Ellen Ripley dummy tuit'
        },
        {
            tuit: 'dummy tuit'
        },
        {
            tuit: 'another dummy tuit'
        }
    ];

    let dummyUser;
    let dummyTuit1;
    let dummyTuit2;
    let dummyTuit3;

    beforeEach(async () => {

        dummyUser = await createUser(ripley);

       
        dummyTuit1 = await createTuitByUser(dummyUser.id, newTuit[0]);
        dummyTuit2 = await createTuitByUser(dummyUser.id, newTuit[1]);
        dummyTuit3 = await createTuitByUser(dummyUser.id, newTuit[2]);
    })

  
    afterEach(async () => {
        await deleteTuit(dummyTuit1._id);
        await deleteTuit(dummyTuit2._id);
        await deleteTuit(dummyTuit3._id);

     
        await deleteUsersByUsername(dummyUser.username);

    
        await userUnlikesTuit(dummyUser.id, dummyTuit1._id);
        await userUnlikesTuit(dummyUser.id, dummyTuit2._id);
        await userUnlikesTuit(dummyUser.id, dummyTuit3._id);
    })

    test('can find my disliked tuits', async () => {
 
        await userTogglesTuitDislikes(dummyUser.id, dummyTuit1._id);
        await userTogglesTuitDislikes(dummyUser.id, dummyTuit2._id);


        const newDislikes = await findAllTuitsDislikedByUser(dummyUser.id);
        expect(newDislikes.length).toEqual(2);


        const newDislike1 = newDislikes[0];
        expect(newDislike1.tuit).toEqual(dummyTuit1.tuit);
        expect(newDislike1.postedBy._id).toEqual(dummyUser.id);
   
        const dislikedTuit1 = await findTuitById(dummyTuit1._id);
        expect(dislikedTuit1.stats.likes).toEqual(0);
        expect(dislikedTuit1.stats.dislikes).toEqual(1);
        
        const newDislike2 = newDislikes[1];
        expect(newDislike2.tuit).toEqual(dummyTuit2.tuit);
        expect(newDislike2.postedBy._id).toEqual(dummyUser.id);

        const dislikedTuit2 = await findTuitById(dummyTuit2._id);
        expect(dislikedTuit2.stats.likes).toEqual(0);
        expect(dislikedTuit2.stats.dislikes).toEqual(1);
    });
});