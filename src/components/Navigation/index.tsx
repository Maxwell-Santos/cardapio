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
import { Total } from '../Total';


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

  const handleChangeIndex: any = (index: number) => {
    setValue(index);

    const tabsElement = document.querySelectorAll('.tab')
    const tabs = Array.from(tabsElement)

    tabs.map(tab => Number(tab.ariaColIndex) == index ?
      tab.classList.add("text-nav-active") : tab.classList.remove("text-nav-active"))
  }

  useEffect(() => {
    activeNav()
    handleChangeIndex(value)

  }, [value])

  return (
    <>
      <nav className="w-full mb-[60px]">

        <TabsUnstyled defaultValue={0}>

          <Tabs
            value={value}
            variant="scrollable"
            aria-label="full-width tabs example"
            scrollButtons={false}
            onChange={handleChange}
            className="flex items-center px-2 py-4 bg-primary sticky top-0 z-10"
          >
            <TabUnstyled className="tab" aria-colindex={0}>
              Todos
            </TabUnstyled>

            <TabUnstyled className="tab" aria-colindex={1}>
              Café da manhã
            </TabUnstyled>

            <TabUnstyled className="tab" aria-colindex={2}>
              Lanches
            </TabUnstyled>

            <TabUnstyled className="tab" aria-colindex={3}>
              Combos
            </TabUnstyled>

            <TabUnstyled className="tab" aria-colindex={4}>
              Sobremesas
            </TabUnstyled>

            <TabUnstyled className="tab" aria-colindex={5}>
              Bebidas
            </TabUnstyled>
          </Tabs>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            className="px-2 overflow-x-hidden"
            index={value}
            animateTransitions
            onChangeIndex={handleChangeIndex}
            resistance
          >
            {/* Guia "TODOS" */}
            <TabPanel value={value} index={0}>
              <h2 className='namesInAll'>Café da manhã</h2>
              {
                data.map((section: SectionProps) => {
                  return section.name == "cafe manha" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }

              <h2 className='namesInAll'>Lanches</h2>
              {
                data.map((section: SectionProps) => {
                  return section.name == "lanches" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }

              <h2 className='namesInAll'>Combos</h2>
              {
                data.map((section: SectionProps) => {
                  return section.name == "combos" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }

              <h2 className='namesInAll'>Sobremesas</h2>
              {
                data.map((section: SectionProps) => {
                  return section.name == "sobremesas" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }

              <h2 className='namesInAll'>Bebidas</h2>
              {
                data.map((section: SectionProps) => {
                  return section.name == "bebidas" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
            </TabPanel>

            {/* Guia "CAFÉ DA MANHÃ" */}
            <TabPanel value={value} index={1}>
              {
                data.map((section: SectionProps) => {
                  return section.name == "cafe manha" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
            </TabPanel>

            {/* Guia "LANCHES" */}
            <TabPanel value={value} index={2}>
              {
                data.map((section: SectionProps) => {
                  return section.name == "lanches" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
            </TabPanel>

            {/* Guia "COMBOS" */}
            <TabPanel value={value} index={3}>
              {
                data.map((section: SectionProps) => {
                  return section.name == "combos" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
            </TabPanel>

            {/* Guia "SOBREMESAS" */}
            <TabPanel value={value} index={4}>
              {
                data.map((section: SectionProps) => {
                  return section.name == "sobremesas" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
            </TabPanel>

            {/* Guia "BEBIDAS" */}
            <TabPanel value={value} index={5}>
              {
                data.map((section: SectionProps) => {
                  return section.name == "bebidas" && (
                    section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
                  )
                })
              }
            </TabPanel>

          </SwipeableViews>
        </TabsUnstyled>
      </nav>
      <Total />
    </>

  )
}
