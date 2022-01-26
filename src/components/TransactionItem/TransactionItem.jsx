import { deleteTransaction } from '../../firebase/firebaseActions';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import styles from './TransactionItem.module.css';

export default function TransactionItem({ transfer, receipt, transaction }) {
    const { error, fetchData } = useFirebaseFetch();

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want delete this transaction?')) {
            fetchData(deleteTransaction(transaction.id));
        }
    };

    const setStyle = () => {
        if (transfer) return { borderLeftColor: '#e76262' };
        if (receipt) return { borderLeftColor: '#1f9751' };
    };

    return (
        <li className={styles.li} style={setStyle()}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button className={styles.button} onClick={deleteHandler}>
                x
            </button>
            {error && <p className="text-error">{error.message}</p>}
        </li>
    );
}
