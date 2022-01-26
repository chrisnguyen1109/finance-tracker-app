import {
    getAllReceiptTransaction,
    getAllTransferTransaction,
} from '../../firebase/firebaseActions';
import useFirebaseRealTime from '../../hooks/useFirebaseRealTime';
import TransactionItem from '../TransactionItem/TransactionItem';

export default function TransactionList({ transfer, receipt, uid }) {
    const { loading, data, error } = useFirebaseRealTime(() => {
        if (transfer) {
            return getAllTransferTransaction(uid);
        }

        if (receipt) {
            return getAllReceiptTransaction(uid);
        }
    });

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p className="text-error">{error.message}</p>}
            {data && data.length === 0 && <p>No data found!</p>}
            {data && !error && (
                <ul>
                    {data.map(transaction => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            transfer={transfer}
                            receipt={receipt}
                        />
                    ))}
                </ul>
            )}
        </>
    );
}
