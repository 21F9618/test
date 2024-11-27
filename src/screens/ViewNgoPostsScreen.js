import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from "../core/theme";
const ngoPostsData = [
  {
    id: 1,
    source: require('../../assets/items/90.png'),
    title: 'Food Drive Success',
    description: 'Our recent food drive fed over 500 people in need.',
    fullDescription:'Join the Fight Against Hunger in Kenya: A Community Food Drive Kenya is currently grappling with severe drought conditions, leaving countless families facing hunger and malnutrition. Crops have failed, livestock is dying, and water sources are drying up, causing widespread food insecurity. In these trying times, our community has the power to make a difference.An NGO in the region has launched a Food Drive Initiative aimed at providing immediate relief to those hardest hit by the drought. The program focuses on distributing essential food supplies, clean drinking water, and nutritional supplements to vulnerable communities, including children and the elderly. Beyond emergency aid, the NGO is working towards long-term solutions, such as drought-resistant farming programs and community water projects.  How You Can Help: Donate: Every contribution, big or small, helps buy food, water, and medical supplies for those in need Volunteer: Join our efforts to pack and distribute food or help spread awareness about the initiative.Raise Awareness: Share information about the drought and this food drive with your network to amplify the cause.Together, we can bring hope and relief to communities in Kenya facing these harsh conditions. Your support can turn hunger into hope and make a lasting impact. Let’s act now and be the change they desperately need.',
  },
  {
    id: 2,
    source: require('../../assets/items/90.png'),
    title: 'Clothing Donation Drive',
    description: 'Helping families with warm clothing for winter.',
    fullDescription:
      'Through our clothing drive, we collected and distributed warm clothes to families in need, ensuring they have the protection they need for the harsh winter ahead.',
  },
  {
    id: 3,
    source: require('../../assets/items/90.png'),
    title: 'Education for All Campaign',
    description: 'Providing books and supplies to underprivileged children.',
    fullDescription:
      'Our education campaign delivered books, school supplies, and resources to underprivileged children, empowering them to pursue their studies with confidence and hope.',
  },
];

export default function ViewNgoPostsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {ngoPostsData.map((post) => (
          <View key={post.id} style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NgoPostDetailsScreen', {
                  title: post.title,
                  description: post.fullDescription,
                  image: post.source,
                })
              }
            >
              <Card style={styles.card}>
                <Image source={ post.source} style={styles.image} />
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description}>{post.description}</Text>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.TaupeBlack,
    padding: 10,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.sageGreen,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
});
