import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable
} from 'react-native';
import { theme } from "../core/theme";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { getBaseUrl } from "../helpers/deviceDetection";
import { AuthContext } from "../context/AuthContext";
import i18n, { t } from "../i18n";

const HomeScreenRec = ({ navigation, route }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const { role, type } = route.params;
  const { user } = useContext(AuthContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const isUrdu = i18n.locale === "ur";

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const BASE_URL = await getBaseUrl();
        const response = await axios.get(`${BASE_URL}/api/get-ngo-campaigns`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={styles.banner}>
          <Image source={require('../../assets/items/hi_rec.jpg')} style={styles.bannerImage} />
          <Text style={styles.heroText}>{t("recipientScreen.greeting")}</Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>{t("recipientScreen.availableDonations")}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Education')} style={styles.iconWrapper}>
            <Icon name="school" size={36} color={theme.colors.pearlWhite} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Clothes')} style={styles.iconWrapper}>
            <Icon name="checkroom" size={36} color={theme.colors.pearlWhite} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Food')} style={styles.iconWrapper}>
            <Icon name="local-dining" size={36} color={theme.colors.pearlWhite} />
          </TouchableOpacity>
        </View>

        {/* Motivation Block */}
        <View style={styles.hero}>
          <Image source={require('../../assets/items/poor.jpeg')} style={styles.heroImage} />
          <Text style={[styles.herooText, { fontSize: isUrdu ? 24 : 16 }]}>
            {t("recipientScreen.motivational_text")}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.heroButton,
              { backgroundColor: pressed ? theme.colors.sageGreen : 'rgba(0, 0, 0, 0.6)' }
            ]}
            onPress={() => navigation.navigate('RecepientStartScreen')}
          >
            <Text style={styles.heroButtonText}>{t("recipientScreen.claimNow")}</Text>
          </Pressable>
        </View>

        {/* Campaign Section */}
        {!(role === 'recipient' && user.recipientType !== 'ngo') && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t("recipientScreen.campaigns")}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("ViewNgoPostsScreen")}>
                <Text style={styles.viewAll}>{t("recipientScreen.viewAll")}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {!loading && campaigns.length > 0 ? (
                campaigns.slice(0, 3).map(campaign => (
                  <TouchableOpacity
                    key={campaign.id}
                    onPress={() => navigation.navigate('NgoPostDetailsScreen', { ...campaign })}
                    style={styles.card}
                  >
                    <Image source={{ uri: campaign.image }} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle} numberOfLines={1}>{campaign.campaignTitle}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {loading ? t("recipientScreen.loadingCampaigns") : t("recipientScreen.noCampaigns")}
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        )}

        {/* NGO Post Campaign Button */}
        {role === 'recipient' && user.recipientType === 'ngo' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('NGOCampaignForm')}
              style={styles.postButton}
            >
              <Text style={styles.postButtonText}>{t("recipientScreen.postCampaign")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.charcoalBlack,
  },
  banner: {
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: theme.colors.TaupeBlack,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  heroText: {
    position: 'absolute',
    top: 60,
    left: 20,
    color: theme.colors.pearlWhite,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  herooText: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    color: theme.colors.pearlWhite,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  hero: {
    height: 220,
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 15,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  heroButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  heroButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: 15,
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
  },
  viewAll: {
    color: theme.colors.sageGreen,
    fontSize: 16,
    padding: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  iconWrapper: {
    backgroundColor: theme.colors.sageGreen,
    padding: 16,
    borderRadius: 30,
    elevation: 5,
  },
  card: {
    backgroundColor: theme.colors.TaupeBlack,
    width: 260,
    height: 220,
    borderRadius: 20,
    marginLeft: 20,
    marginVertical: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.sageGreen,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '75%',
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    color: theme.colors.ivory,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  postButton: {
    backgroundColor: theme.colors.sageGreen,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  postButtonText: {
    color: theme.colors.ivory,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreenRec;
