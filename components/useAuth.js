import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firbase-config';

const useAuth = () => {
    const [userData, setUserData] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    const userDoc = await getDoc(doc(db, 'users', userToken));
                    if (userDoc.exists()) {
                        const userData = { id: userDoc.id, ...userDoc.data() }; // Include ID along with user data
                        setUserData(userData);
                    } else {
                        console.log('User data not found in Firestore');
                    }
                } else {
                    console.log('User token not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoad(false);
            }
        };



        fetchUserData();
    }, []);

    return { userData, load};
};

export default useAuth;