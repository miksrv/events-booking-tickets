import classNames from 'classnames'
import React from 'react'

import styles from './styles.module.sass'

const Header: React.FC = () => (
    <div className={styles.header}>
        <div className={classNames('wrapper')}>
            <div className={styles.item}>Header Item</div>
        </div>
    </div>
)

export default Header
