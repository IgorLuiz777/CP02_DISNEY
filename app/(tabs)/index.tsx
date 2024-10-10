import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native';

interface Character {
  _id: number;
  films: string[];
  videoGames: string[];
  name: string;
  imageUrl: string;
  url: string;
}

export default function HomeScreen() {
  const [charactersList, setCharactersList] = useState<Character[]>([]);

  async function fetchCharacters() {
    try {
      const response = await axios.get('https://api.disneyapi.dev/character');
      console.log(response.data);
      setCharactersList(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar os personagens: ', error);
      const response = await axios.get('https://api.disneyapi.dev/character');
      console.log(charactersList);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView>
          {(charactersList).map((char) => (
            <TouchableHighlight style={styles.card} key={char._id}>
              <>
                <Text>{char.name}</Text>
                {char.films.map((films) => {
                  <Text>{films}</Text>
                })}
                <Text>{char.videoGames}</Text>
                <Image style={styles.image} src={char.imageUrl}></Image>
                <Text>{char.imageUrl}</Text>
                <Text>{char.url}</Text>
              </>
            </TouchableHighlight>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 5,
  },
});
