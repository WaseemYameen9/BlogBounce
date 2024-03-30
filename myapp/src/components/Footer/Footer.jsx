import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.text}>
                    &copy; Copyright BlogBounce
                </div>
            </div>
        </footer>
    );
}

export default Footer;
