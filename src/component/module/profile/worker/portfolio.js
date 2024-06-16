import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Textinput from '../../../base/text/textinput';
import TextField from '../../../base/text/textfield';
import styles from '../../../../css/profile';
import cloud from '../../../../assets/image/icon/cloud1.png';
import size from '../../../../assets/image/icon/size.png';
import image from '../../../../assets/image/icon/image.png';
import MediumButton from '../../../base/button/mediumbutton';
import MediumTransparentYellow from '../../../base/button/mediumtransparentyellow';

const Portfolio = () => {
  const [portfolioType, setPortfolioType] = useState('mobile');

  return (
    <View style={styles.containerPortfolio}>
      <Text style={styles.titlePortfolio}>Portfolio</Text>
      <View style={styles.underline} />
      <View style={styles.subProfile}>
        <Text style={styles.titleapp}>Application Name</Text>
        <View style={styles.spacetitleapp}>
          <Textinput placeholder="Enter Application Name" />
        </View>
      </View>
      <View style={styles.subProfile}>
        <Text style={styles.titledesc}>Description</Text>
        <View style={styles.spacetitledesc}>
          <TextField placeholder="Description Your Application" />
        </View>
      </View>
      <View style={styles.subProfile}>
        <Text style={styles.linkpublictitle}>Link Publication</Text>
        <View style={styles.spacelinkpublictitle}>
          <Textinput placeholder="Enter Link Publication" />
        </View>
      </View>
      <View style={styles.subProfile}>
        <Text style={styles.linkrepotitle}>Link Repository</Text>
        <View style={styles.spacelinkrepotitle}>
          <Textinput placeholder="Enter Link Repository" />
        </View>
      </View>
      <View style={styles.subProfile}>
        <Text style={styles.linkworkspacetitle}>Link Workplace</Text>
        <View style={styles.spacelinkworkspacetitle}>
          <Textinput placeholder="Enter Workplace" />
        </View>
      </View>
      <View style={styles.radioContainer}>
        <Text style={styles.label}>Type Portfolio</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPortfolioType('mobile')}>
            <View
              style={
                portfolioType === 'mobile'
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            />
            <Text
              style={
                portfolioType === 'mobile'
                  ? styles.radioTextSelected
                  : styles.radioTextUnselected
              }>
              Mobile Application
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPortfolioType('web')}>
            <View
              style={
                portfolioType === 'web'
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            />
            <Text
              style={
                portfolioType === 'web'
                  ? styles.radioTextSelected
                  : styles.radioTextUnselected
              }>
              Web Application
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text />
      </View>
      <View style={styles.subProfileUpload}>
        <Text style={styles.titleupload}>Upload Image</Text>
        <View style={styles.containerUpload}>
          <View style={styles.uploadfile}>
            <Image source={cloud} style={styles.uploadcloud} />
            <Text style={styles.uploadfiletext}>Upload File From Storage</Text>
          </View>
          <View style={styles.uploadsubcontainer}>
            <View style={styles.highres}>
              <Image source={size} style={styles.highresimage} />
              <Text style={styles.texthighres}>
                High-Res Image PNG, JPG or GIF
              </Text>
            </View>
            <View style={styles.sizebox}>
              <Image source={image} style={styles.sizeimage} />
              <Text style={styles.textsize}>Size 1080x1920 or 600x800</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingTop: 30, paddingLeft: 20, width: '90%', gap: 10}}>
        <View style={styles.underline} />
        <View style={{padding: 10}}>
          <MediumTransparentYellow label="Add Work Experience" />
        </View>
      </View>
    </View>
  );
};

export default Portfolio;
