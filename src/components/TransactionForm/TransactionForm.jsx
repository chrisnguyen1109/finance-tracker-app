import { useState } from 'react';
import { toast } from 'react-toastify';
import { addTransaction } from '../../firebase/firebaseActions';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';

export default function TransactionForm({ uid, userAccId, money }) {
    const [receiverId, setReceiverId] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { loading, error, fetchData, setError } = useFirebaseFetch();

    const handleSubmit = e => {
        e.preventDefault();
        if (loading) return;

        if (uid === receiverId) {
            setError(
                new Error(
                    "The recipient's user id must be different from yours!"
                )
            );
            return;
        }

        if (+amount > money) {
            setError(
                new Error(
                    'Your current amount is not enough to make the transaction!'
                )
            );
            return;
        }

        fetchData(
            addTransaction(
                { userAccMoney: money, userAccId },
                { uid, receiverId, name, amount: +amount }
            ),
            res => {
                if (!res) {
                    setError(new Error('Something went wrong!'));
                    return;
                }

                setReceiverId('');
                setName('');
                setAmount('');
                toast.success('Successful transaction!');
            }
        );
    };

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipient's user id:</span>
                    <input
                        type="text"
                        required
                        onChange={e => setReceiverId(e.target.value)}
                        value={receiverId}
                    />
                </label>
                <label>
                    <span>Transaction content:</span>
                    <input
                        type="text"
                        required
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type="number"
                        required
                        onChange={e => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <button>{loading ? 'Loading' : 'Add Transaction'}</button>
                {error && <p className="text-error">{error.message}</p>}
            </form>
        </>
    );
}
