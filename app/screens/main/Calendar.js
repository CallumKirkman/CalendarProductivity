import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";

const timeToString = (time) => {
  const date = new Date(time);
  console.log(date);
  return date.toISOString().split("T")[0];
};

const Calendar = () => {
  const [items, setItems] = useState({});

  let todayDate = new Date().getDate();
  let todayMonth = new Date().getMonth() + 1;
  let todayYear = new Date().getFullYear();
  let fullDate = todayYear + "-" + todayMonth + "-" + todayDate;

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " Item:" + j,
              height: Math.max(7, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 50);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text label="I" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={fullDate}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Calendar;
