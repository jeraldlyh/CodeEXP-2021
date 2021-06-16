import React, { useState } from 'react';
import { Modal, Portal, Text, Provider } from 'react-native-paper';

const ModalMsg = ({ message }) => {
    const [visible, setVisible] = useState(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>{message}</Text>
            </Modal>
        </Portal>
    );
}
export default ModalMsg;