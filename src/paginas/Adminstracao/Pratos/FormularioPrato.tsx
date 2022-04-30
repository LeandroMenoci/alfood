import { Button, TextField, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import React, { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"



const FormularioPrato = () => {
  const url = 'http://localhost:8000/api/v2/tags/'


  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [restaurante, setRestaurante] = useState('')
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    axios.get<{ tags: ITag[] }>(url)
      .then(resposta => setTags(resposta.data.tags))
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    axios.request({
      url: 'http://localhost:8000/api/v2/pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setNomePrato('')
        setDescricao('')
        setTag('')
        setRestaurante('')
        alert('prato cadastrado com sucesso')
      })
      .catch(erro => console.log(erro))

  }
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component='h1' variant='h6'>Formulário de Pratos</Typography>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
              <TextField
                value={nomePrato}
                onChange={event => setNomePrato(event.target.value)}
                id="standard-basic"
                label="Nome do Prato"
                variant="standard"
                fullWidth
                required
                margin='dense' />
              <TextField
                value={descricao}
                onChange={event => setDescricao(event.target.value)}
                id="standard-basic"
                label="Descrição do Prato"
                variant="standard"
                fullWidth
                required />

              <FormControl margin='dense' fullWidth>
                <InputLabel id='select-tag'>Tag</InputLabel>
                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                  {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                    {tag.value}
                  </MenuItem>)}
                </Select>
              </FormControl>
              <FormControl margin='dense' fullWidth>
                <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                  {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                    {restaurante.nome}
                  </MenuItem>)}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionarArquivo} />

              <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth >Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioPrato