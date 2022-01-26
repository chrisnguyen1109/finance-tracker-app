import styles from './AmountMoney.module.css';

export default function AmountMoney({ loading, money, error }) {
    const amountContent = () => {
        if (loading) {
            return 'Loading';
        }

        if (error) {
            return error.message;
        }

        return `${money} $`;
    };

    return (
        <div className={styles.amount}>
            <h3>The remaining amount:</h3>
            <strong>{amountContent()}</strong>
        </div>
    );
}
