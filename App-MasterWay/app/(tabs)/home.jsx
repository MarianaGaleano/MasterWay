import { View } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Search from '../../components/Home/Search';
import TravelListByCategory from '../../components/Home/TravelListByCategory';

export default function MyTrip() {
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      {/* Header */}
      <Header />
      <br></br>
      {/* Search */}
      <Search />
      {/* TravelList + Category */}
      <TravelListByCategory />
    </View>
  );
}
