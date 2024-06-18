import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  CardContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  CardData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CardProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  CardProfileName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  CardProfileJob: {
    color: 'grey',
    maxWidth: '80%',
  },
  CardCategory: {
    textAlign: 'center',
    backgroundColor: '#FBB017',
    paddingHorizontal: 10,
    height: 25,
    borderRadius: 5,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 25,
  },
  CategoryContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
