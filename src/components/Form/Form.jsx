import React from 'react';
import styles from './Form.module.css';

const Form = ({ onClick, error }) => (
    <form onSubmit={e => onClick(e)} className={styles.formGroup}>
        <div className={styles.textGroup}>
            <input type='text' name='city' placeholder='Город' />
            {error && <span>{error}</span>}
        </div>
        <button type='submit' className="floating-button color-green">Узнать погоду</button>
    </form>
)

export default Form;