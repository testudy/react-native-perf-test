import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebBrowser } from 'expo';
import JSEncrypt from 'jsencrypt';

export default class App extends React.Component {
    state = {
        time: 0,
    };

    handleTest = () => {
        if (this.testing) {
            return;
        }
        this.testing = true;
        const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgG/Vt1vE27THE6KQXTdfY4TTb9bd
gJIXsjQuYbmyqYT61KMLhWHrn9B1sryLvMF2a0pBweJBU4yyer7J6/GREuv1V1I/
0WQ2Gqtlik0uDETUSvroy1f3sxgBiePWM8MFybKGkRJH4KxNMCusg76CvO522t2p
r39+p4Ebs1CG+1CvAgMBAAE=
-----END PUBLIC KEY-----
        `;

        const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgG/Vt1vE27THE6KQXTdfY4TTb9bdgJIXsjQuYbmyqYT61KMLhWHr
n9B1sryLvMF2a0pBweJBU4yyer7J6/GREuv1V1I/0WQ2Gqtlik0uDETUSvroy1f3
sxgBiePWM8MFybKGkRJH4KxNMCusg76CvO522t2pr39+p4Ebs1CG+1CvAgMBAAEC
gYAtRZS+X4iZO+Wk70/s9H5y7KzfjDdZ7KHFIemJpNue63NctXM/WoUNfDfov6Cf
qHJyUwBLuSo7UJ0D0vXiilngBiFfhuIpaR7evsCDtZvSFz1JUnCFXdhgCcwb4sul
eV0sqCQPtChouUFUYjNbJmu+KTBx7OLjwexZJDzCG9eisQJBAKzac/TtcKTrsyzW
DLPG2uC6GTXPmFyJrGCwT3uRSZM7Vc8dyplwp+ckjgGkbFV/7jpUcmKdtAM1sS2M
IahDMXsCQQCloU7XXsRPn1RC+nACd9NVIL/j3nlQ4f8NDrZjemNSOWOOFfimd028
2fGpLTLHkCKPaHTWR2G3Ys6EDHNlBdVdAkBaBS8MqLfYfBQFTriwy+hjzyef+ax8
zQpkFI5gaSrrLaSjx/0iaiRXYZc/TbVJ1eVopWAo8b61STor4WYJ7myPAkAw4UsQ
OlJ7IQ1P+vLFd7FxpQmcaRKqcRfBNb9T2lGneXJNA2TvU7QocLVl9QXQaVQZuH0K
o+RNp6ZEyBviC3etAkBzLR61JlPwWlCwHBeoolSZyGWnnc89tHLtwg2AByN02oHO
Ey0H1ls3w0lYlgB0BegnTIO6bISKlMmPrx0sY6Cb
-----END RSA PRIVATE KEY-----
        `;

        const decrypt = new JSEncrypt();
        decrypt.setPublicKey(publicKey);

        const encrypt = new JSEncrypt();
        encrypt.setPrivateKey(privateKey);

        const text = '关关雎鸠，在河之洲。窈窕淑女，君子好逑。';
        const start = Date.now();

        for (let i = 0; i < 200; i += 1) {
            const enc = decrypt.encrypt(text);
            const dec = encrypt.decrypt(enc);
        }

        const end = Date.now();
        this.setState({
            time: end - start,
        });
        this.testing = false;
    };

    handleOpenBrowser = () => {
        WebBrowser.openBrowserAsync('http://192.168.1.11:5000/');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>花费时间：{this.state.time}</Text>
                <Button onPress={this.handleTest} title="Press to test" />
                <Button onPress={this.handleOpenBrowser} title="Open browser" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
