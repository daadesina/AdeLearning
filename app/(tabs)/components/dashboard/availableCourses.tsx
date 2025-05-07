import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import courses from '@/app/(tabs)/components/dashboard/courses.json'
import { DashboardImages } from "../../assets/images";

export default function AvailableCourses(){
    return(
        <View style={{width: '90%', alignSelf: 'center', paddingVertical: 10}}>
            <FlatList
            data={courses}
            horizontal
            showsHorizontalScrollIndicator = {false}
            renderItem={({item}) => (
                <View style={{backgroundColor: '#E9F7FF', padding: 15, width: 249, 
                height: 170, borderRadius: 15, justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{fontSize: 12, fontWeight: '500'}}>{item.description}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <View style = {{rowGap: 3}}>
                            <Text style={{color: '2F2F42', fontWeight: 'bold'}}>{item.name}</Text>
                            <TouchableOpacity style={{backgroundColor: item.status == 'Locked' ? '#858597' : '#F59E0B',  
                                width: item.status == 'Locked' ? 60 : 100 , 
                                paddingVertical: 8, borderRadius: 6}} 
                                disabled = {item.status == 'Locked' ? true : false} 
                                >
                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{item.status}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image source={DashboardImages[item.image]} style={{width: 70, height: 70, resizeMode: 'contain'}}/>
                        </View>
                    </View>
                </View>
            )}
            keyExtractor={(item) => (item.id).toString()}
            ItemSeparatorComponent={() => <View style={{margin: 8}}/>}
            />
        </View>
    )
}