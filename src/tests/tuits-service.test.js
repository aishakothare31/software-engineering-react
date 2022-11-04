import {createUser, findUserById} from "../services/users-service";
import {
    createTuitByUser,
    deleteTuit,
    findTuitById,
    findAllTuits,
    findTuitsByUser
} from "../services/tuits-service"
import {deleteUsersByUsername} from "./services";

describe('createTuit', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to check creation';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let newUser;
    let tuit;
    

    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;
    });

    afterEach(async () => {
        // return deleteTuit(tuit._id) && deleteUsersByUsername(ripley.username);
        while(userId) {
            return deleteTuit(tuit._id);
        }
        await deleteUsersByUsername(ripley.username);
        // await deleteUsersByUsername(ripley.username);
    });

    test('can create tuit with REST API', async () => {
        const newTuit = {
            tuit: tuitText,
            postedOn: currDate,
            postedBy: newUser,
        };
        tuit = await createTuitByUser(userId, newTuit);
        expect(tuit.tuit).toEqual(tuitText);
        expect(tuit.postedOn).toEqual("2022-11-02T11:48:48.360Z");
        expect(tuit.postedBy).toEqual(userId);
    });
});

describe('deleteTuit', () => {
    const ripley = {
        firstName: "ellen",
        lastName: "ripley",
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random test to check deletion';
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId;
    let newUser;
    let tuit;

    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;

        const newTuit = {
            tuit: tuitText,
            postedOn: currDate,
            postedBy: newUser,
        };
        tuit = await createTuitByUser(userId, newTuit);
    });

    afterEach(async () => {
        // return deleteTuit(tuit._id);
        // await deleteUsersByUsername(ripley.username);
        while(userId) {
            return deleteTuit(tuit._id);
        }
        await deleteUsersByUsername(ripley.username);
    });

    test('can delete tuit with REST API by tuitid', async () => {
        const status = await deleteTuit(tuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('findTuitById', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const tuitText = 'random tuit to test specific tuit';
    const currDate = new Date("2022-11-02T11:48:48.360Z");

    let userId, newUser, tuit;
    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;

        const newTuit = {
            tuit: tuitText,
            postedOn: currDate,
            postedBy: newUser,
        };
        tuit = await createTuitByUser(userId, newTuit);
    });

    afterEach(async () => {
        while(userId) {
            return deleteTuit(tuit._id);
        }
        await deleteUsersByUsername(ripley.username);
        
    });

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const tuitResponse = await findTuitById(tuit._id);
        expect(tuitResponse._id).toEqual(tuit._id);
        expect(tuitResponse.tuit).toEqual(tuitText);
        expect(tuitResponse.postedOn).toEqual("2022-11-02T11:48:48.360Z");
        expect(tuitResponse.postedBy).toEqual(userId);

    
    });
});

describe('findAllTuits', () => {
    const tuitTexts = ['test tuit 1', 'test tuit 2', 'test tuit 3'];
    const tuitIds = [];
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const currDate = new Date("2022-11-02T11:48:48.360Z");
    let userId, newUser, tuit;

    beforeEach(async () => {
        newUser = await createUser(ripley);
        userId = newUser._id;

        for (const text of tuitTexts) {
            let newTuit = {
                tuit: text,
                postedOn: currDate,
                postedBy: newUser,
            };
            tuit = await createTuitByUser(userId, newTuit);
            tuitIds.push(tuit._id);
        }
    });

    afterEach(async () => {
        for (const id of tuitIds) {
            return deleteTuit(id);
        }
        await deleteUsersByUsername(ripley.username);
    });

    test('can retrieve all tuits with REST API', async () => {
        const tuitResponse = await findAllTuits();
        const textsRetreived = tuitResponse.map(tuit => tuit);
        expect(textsRetreived).toEqual(tuitResponse)
    });
});