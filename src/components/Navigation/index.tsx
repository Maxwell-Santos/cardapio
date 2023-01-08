import { useContext } from 'react';

import { Card } from '../Card';

import { CartContext } from '../../context/CartContext';
import { SectionProps } from '../../interfaces/SectionProps';
import { Total } from '../Total';

import { Link } from 'react-scroll'

export function Navigation() {
  const { data } = useContext(CartContext)
  
  return (
    <>
      <nav className="w-full flex overflow-auto px-2 sticky top-0 bg-primary/50 backdrop-blur-md py-3 z-50">

        <Link
          to='breakfast'
          smooth={true}
          offset={-55}
          className='tab'
          activeClass='active'
          spy
          >
          Café da manhã
        </Link>
        <Link
          to='fastfood'
          smooth={true}
          offset={-55}
          className='tab'
          activeClass='active'
          spy
          >
          Lanches
        </Link>

        <Link
          to='combos'
          smooth={true}
          offset={-55}
          className='tab'
          activeClass='active'
          spy
          >
          Combos
        </Link>
        <Link
          to='sweets'
          smooth={true}
          offset={-55}
          className='tab'
          activeClass='active'
          spy
          >
          Sobremesas
        </Link>
        <Link
          to='drinks'
          smooth={true}
          offset={-55}
          className='tab'
          activeClass='active'
          spy
          >
          Bebidas
        </Link>
      </nav >

      <section className="px-3" id="breakfast">
        <h2 className='namesInAll'>Café da manhã</h2>
        {
          data.map((section: SectionProps) => {
            return section.name == "cafe manha" && (
              section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
            )
          })
        }
      </section>


      <section className="px-3 mt-10" id="fastfood">
        <h2 className='namesInAll'>Lanches</h2>
        {
          data.map((section: SectionProps) => {
            return section.name == "lanches" && (
              section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
            )
          })
        }
      </section>


      <section className="px-3 mt-10" id="combos">
        <h2 className='namesInAll'>Combos</h2>
        {
          data.map((section: SectionProps) => {
            return section.name == "combos" && (
              section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
            )
          })
        }
      </section>


      <section className="px-3 mt-10" id="sweets">
        <h2 className='namesInAll'>Sobremesas</h2>
        {
          data.map((section: SectionProps) => {
            return section.name == "sobremesas" && (
              section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
            )
          })
        }
      </section>

      <section className="px-3 mt-10" id="drinks">
        <h2 className='namesInAll'>Bebidas</h2>
        {
          data.map((section: SectionProps) => {
            return section.name == "bebidas" && (
              section.content.map((contentItem) => <Card key={contentItem.id} sectionId={section.id} item={contentItem} />)
            )
          })
        }
      </section>
      <Total />
    </>

  )
}
