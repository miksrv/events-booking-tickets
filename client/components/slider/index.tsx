import classNames from 'classnames'
import React from 'react'

import styles from './styles.module.sass'

const Slider: React.FC = () => (
    <div className={styles.slider}>
        <div className={styles.overlay}>
            <div className={classNames('wrapper')}>
                <h1 className={styles.title}>
                    Астрономические мероприятия под звездным небом - астровыезды
                </h1>
                <h2 className={styles.subtitle}>
                    Окунитиесь в мир астрономических путешествий вместе с нами
                </h2>
            </div>
        </div>
    </div>
)

export default Slider
