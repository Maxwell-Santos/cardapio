import { useContext, useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import { TabPanel } from './TabPanel';

import SwipeableViews from 'react-swipeable-views';
import { Card } from '../Card';

import TabUnstyled from '@mui/base/TabUnstyled';
import { TabsUnstyled } from '@mui/base';
import { CartContext } from '../../context/CartContext';
import { SectionProps } from '../../interfaces/SectionProps';


export function Navigation() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const { data } = useContext(CartContext);

  function activeNav() {
    const tabsElement = document.querySelectorAll('.tab')
    const tabs = Array.from(tabsElement)

    tabs.map(tab => tab.ariaSelected == "true" && tab.classList.add("text-nav-active"))

  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index);

    const tabsElement = document.querySelectorAll('.tab')
    const tabs = Array.from(tabsElement)

    tabs.map(tab => Number(tab.ariaColIndex) == index ? tab.classList.add("text-nav-active") : tab.classList.remove("text-nav-active"))

  };

  useEffect(() => {
    activeNav()
    handleChangeIndex(value)

  }, [value])

  return (
    <nav className="w-full">

      <TabsUnstyled defaultValue={0}>

        <Tabs
          value={value}
          variant="scrollable"
          aria-label="full-width tabs example"
          scrollButtons={false}
          onChange={handleChange}
          className="flex items-center"
        >
          <TabUnstyled className="tab" aria-colindex={0}>
            Todos
          </TabUnstyled>

          <TabUnstyled className="tab" aria-colindex={1}>
            Lanches
          </TabUnstyled>

          <TabUnstyled className="tab" aria-colindex={2}>
            Café da manhã
          </TabUnstyled>

          <TabUnstyled className="tab" aria-colindex={3}>
            Bebidas
          </TabUnstyled>

          <TabUnstyled className="tab" aria-colindex={4}>
            Sobremesas
          </TabUnstyled>
        </Tabs>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          className="overflow-x-visible"
          index={value}
          // animateTransitions
          onChangeIndex={handleChangeIndex}
          resistance
        >
          <TabPanel value={value} index={0}>
              {
                data.map((section: SectionProps) => {
                  return section.name == "lanches" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
              {
                data.map((section: SectionProps) => {
                  return section.name == "cafe manha" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
              {
                data.map((section: SectionProps) => {
                  return section.name == "bebidas" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
              {
                data.map((section: SectionProps) => {
                  return section.name == "sobremesas" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
          </TabPanel>

          <TabPanel value={value} index={1}>
            {
              data.map((section: SectionProps) => {
                return section.name == "lanches" && (
                  section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                )
              })
            }
          </TabPanel>

          <TabPanel value={value} index={2}>
            {
              data.map((section: SectionProps) => {
                return section.name == "cafe manha" && (
                  section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                )
              })
            }
          </TabPanel>

          <TabPanel value={value} index={3}>
            {
              data.map((section: SectionProps) => {
                return section.name == "bebidas" && (
                  section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                )
              })
            }
          </TabPanel>

          <TabPanel value={value} index={4}>
            {
              data.map((section: SectionProps) => {
                return section.name == "sobremesas" && (
                  section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                )
              })
            }
          </TabPanel>
        </SwipeableViews>
      </TabsUnstyled>

    </nav >
  )
}
