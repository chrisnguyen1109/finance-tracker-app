import { useSelector } from 'react-redux';
import AmountMoney from '../../components/AmountMoney/AmountMoney';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import TransactionList from '../../components/TransactionList/TransactionList';
import { getUserMoney } from '../../firebase/firebaseActions';
import useFirebaseRealTime from '../../hooks/useFirebaseRealTime';
import styles from './Home.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Home() {
    const { uid } = useSelector(state => state.auth.currentUser);

    const { loading, data, error } = useFirebaseRealTime(() => {
        return getUserMoney(uid);
    });

    const money = data?.[0]?.amount;
    const userAccId = data?.[0]?.id;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <AmountMoney loading={loading} money={money} error={error} />
                <Tabs>
                    <TabList>
                        <Tab>Receipt</Tab>
                        <Tab>Transfer</Tab>
                    </TabList>

                    <TabPanel>
                        <TransactionList receipt uid={uid} />
                    </TabPanel>
                    <TabPanel>
                        <TransactionList transfer uid={uid} />
                    </TabPanel>
                </Tabs>
            </div>
            <div className={styles.sidebar}>
                <TransactionForm
                    uid={uid}
                    money={money}
                    userAccId={userAccId}
                />
            </div>
        </div>
    );
}
