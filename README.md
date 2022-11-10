## Como funciona as trocas de telas

Basicamente usei um componente do Material UI porém eu peguei um deles sem estilização já que era muito diferente do que eu queria para o projeto final

</br>

Bom, a mudança da barrinha indicadora, já vem do material, mas ela não avisa em lugar nenhum, ela não tem nenhuma âncora com as telas, apenas muda de acordo que eu clico ou arrasto a tela

</br>

Para sincronizar isso e fazer com que o titulo da seção mostrasse que ele era o atual, deu um trabalhinho... mas nada que com documentação e eum pouco de pensar, não resolva

</br>


 - Primeiro criei esse novo atributo com valores numéricos semelhantes a index de array, o <code>aria-colindex</code>

```tsx
<Tabs
  value={value} //seção 
  onChange={handleChange}
  className="flex items-center justify-center border-none px-2"
>
  <TabUnstyled className="tab" aria-colindex={0}>
    Todos
  </TabUnstyled>
</Tabs>
```

  - Daí, ja dei até um spoiler do que eeu fiz... sempre que arrasta a tela para trocar seção, dispara um callback que tem como parâmetro justamente a posição do index daquela seção

```tsx  
<SwipeableViews
  index={value} //mostra a seção atual com base no index
  onChangeIndex={handleChangeIndex} //callback que dispara ao arrastar a tela para o lado, ele tem como parâmetro o index próximo TabPanel
>

  <TabPanel value={value} index={0}>
    {
      items.map(item => {
        return item.name == "todos" && (
          item.content.map(contentItem => <Card item={contentItem} />)
        )
      })
    }
  </TabPanel>

</SwipeableViews>
```

 - Sempre que muda a seção (clicando no nome dela, não arrastando para o lado) também altera uma propriedade naquela tag que envolve o titulo, o <code>aria-selected</code>

 - Sabendo disso, fiz o seguinte código:

```tsx
export function Navigation() {
  const [value, setValue] = useState(0); // essa é a variável que é usada para comparar e definir qual a seção atual

  //muda a cor do titulo da seção atual
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
```

