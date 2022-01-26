import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import db, { auth } from './config';

export const signup = async (email, password, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res) {
        throw new Error('Could not complete signup!');
    }

    return Promise.all([
        updateProfile(res.user, { displayName }),
        addDoc(collection(db, 'users'), {
            userId: res.user.uid,
            email: res.user.email,
            amount: 0,
        }),
    ]);
};

export const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signinProvider = async provider => {
    const res = await signInWithPopup(auth, provider);

    if (!res) {
        throw new Error('Could not complete signup!');
    }

    const queryUser = query(
        collection(db, 'users'),
        where('userId', '==', res.user.uid)
    );
    const userDoc = await getDocs(queryUser);

    if (userDoc.empty) {
        return addDoc(collection(db, 'users'), {
            userId: res.user.uid,
            email: res.user.email,
            amount: 0,
        });
    }

    return userDoc.docs[0];
};

export const signout = () => {
    return signOut(auth);
};

export const getUserMoney = userId => {
    return query(collection(db, 'users'), where('userId', '==', userId));
};

export const addTransaction = async (
    { userAccMoney, userAccId },
    transaction
) => {
    const queryUser = query(
        collection(db, 'users'),
        where('userId', '==', transaction.receiverId)
    );
    const response = await getDocs(queryUser);

    if (response.empty) {
        throw new Error('No recipient id exists!');
    }

    const userId = response.docs[0].id;
    const userAmount = response.docs[0].data().amount;

    const promises = [
        addDoc(collection(db, 'transactions'), {
            ...transaction,
            createdAt: Timestamp.fromDate(new Date()),
        }),
        updateDoc(doc(db, 'users', userId), {
            amount: userAmount + transaction.amount,
        }),
        updateDoc(doc(db, 'users', userAccId), {
            amount: userAccMoney - transaction.amount,
        }),
    ];

    return Promise.all(promises);
};

export const getAllTransferTransaction = uid => {
    return query(
        collection(db, 'transactions'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
    );
};

export const getAllReceiptTransaction = uid => {
    return query(
        collection(db, 'transactions'),
        where('receiverId', '==', uid),
        orderBy('createdAt', 'desc')
    );
};

export const deleteTransaction = id => {
    return deleteDoc(doc(db, 'transactions', id));
};
