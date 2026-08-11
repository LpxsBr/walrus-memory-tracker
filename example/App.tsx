import WalrusMemoryTracker from 'walrus-memory-tracker';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';

export default function App() {

  const [memoryData, setMemoryData] = React.useState<{
    totalMemory: any;
    freeMemory: any;
    usedMemory: any;
    app_usedMemory: any;
  }>({
    totalMemory: 0,
    freeMemory: 0,
    usedMemory: 0,
    app_usedMemory: 0
  });

  React.useEffect(() => {
    let cancelled = false;

    const loadMemory = async () => {
      try {
        const [memoryInfo] = await Promise.all([
          WalrusMemoryTracker.getMemoryInfo(),
        ]);

        console.log('Memory info:', JSON.stringify(memoryInfo));

        if (cancelled) return;

        const { device_totalMemory, device_availableMemory, device_usedMemory, process_usedMemory } = memoryInfo;

        setMemoryData({
          totalMemory: device_totalMemory, freeMemory: device_availableMemory, usedMemory: device_usedMemory, app_usedMemory: process_usedMemory
        });
      } catch (error) {
        if (!cancelled) {
          console.error('Erro ao obter memória:', error);
        }
      }
      
      console.log('RENDER:', JSON.stringify(memoryData));
    };

    loadMemory();

    const interval = setInterval(loadMemory, 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Functions">
          <Text>{Number(memoryData.totalMemory / 1024).toFixed(2)} GB</Text>
          <Text>{Number(memoryData.usedMemory  / 1024).toFixed(2)} GB</Text>
          <Text>{Number(memoryData.freeMemory  / 1024).toFixed(2)} GB</Text>
          <Text>{Number(memoryData.app_usedMemory  / 1024).toFixed(2)} GB</Text>

          <Text>{WalrusMemoryTracker.hello()}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: { fontSize: 30, margin: 20 },
  groupHeader: { fontSize: 20, marginBottom: 20 },
  group: { margin: 20, backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  container: { flex: 1, backgroundColor: '#eee' },
  view: { flex: 1, height: 200 },
};
