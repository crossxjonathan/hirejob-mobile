import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  CardContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 100,
    borderRadius: 5,
    padding: 20,
  },
  CardData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardProfile: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  CardProfileName: {
    color: '#000000',
    paddingRight: 100,
  },
  CardProfileJob: {
    color: 'grey',
  },
  CardCategory: {
    textAlign: 'center',
    backgroundColor: '#FBB017',
    width: '110%',
    height: 25,
    borderRadius: 5,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  CategoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});
