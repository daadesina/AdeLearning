import { View, FlatList, Text, TouchableOpacity, Image, Alert } from "react-native";
import terminal from '@/app/(tabs)/components/dashboard/terminalTopics.json'
import { DashboardImages } from "../../assets/images";

export default function Terminal(){
    return(
        <View>
            <FlatList
            data={terminal}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={{backgroundColor: 'transparent', padding: 15, alignItems: 'center', borderRadius: 15, justifyContent: 'space-between', flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', columnGap: '8%'}}
                        onPress={() => {
                            Alert.alert(item.category, (item.topics).join('\n\n'))
                        }}
                        >
                        <View>
                            <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>{item.id}</Text>
                        </View>
                        <View style={{rowGap: 5, width: '53%'}}>
                            <Text style={{fontSize: 15, color: 'white', fontWeight: '500'}}>{item.category}</Text>
                            <View style={{flexDirection: 'row', columnGap: 8, alignItems: 'center'}}>
                                <Text style={{fontSize: 13, color: 'white'}}>{item.duration} min</Text>
                                {item.label == "Completed" && <Image source={DashboardImages.completedIcon} style={{width: 12, height: 12}}/>}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity 
                                style={{backgroundColor: item.label == "Completed" ? '#2D6A4F' : "#3D5CFF", borderRadius: 5}}
                                disabled = {item.label == "Completed" ? true : false}
                                >
                            <Text style={{fontSize: 12, color: 'white', paddingHorizontal: 4, paddingVertical: 6, fontWeight: '500'}}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            keyExtractor={(item) => (item.id).toString()}
            ItemSeparatorComponent={() => <View style={{margin: 8}}/>}
            />
        </View>
    )
}