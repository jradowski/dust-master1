"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'reactjs-popup/dist/index.css'
import supabase from '@/supabaseClient.js'
import { useEffect, useState } from 'react'


const UserForm: React.FC = () => {
  const [id, setId] = useState<number | string>('');  // Typ string jest używany tymczasowo, by łatwiej obsłużyć pole input
  const [imie, setImie] = useState<string>('');
  const [dataUrodzenia, setDataUrodzenia] = useState<string>(''); // Zmienna do przechowywania daty
  const [plec, setPlec] = useState<string>(''); // Zmienna do przechowywania płci
  const [id_wlasciciela, setIdWlasciciela] = useState<number | string>('');
  const [wlasciciel, setWlasciciel] = useState<string>('');
  const [v, setV] = useState<string>('');
  const [m, setM] = useState<string>('');
  const [mv, setMv] = useState<string>('');
  const [kowal, setKowal] = useState<string>('');
  const [ilosc_posilkow, setIloscPosilkow] = useState<number | string>('');
  const [wielkosc_posilku, setWielkoscposilku] = useState<number | string>('');
  const [posilek, setPosilek] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Zmienna do przechowywania pliku zdjęcia



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsedId = parseInt(id as string, 10); // Konwersja id z string na number
    if (isNaN(parsedId)) {
      return;
    }


  let imageUrl = '';
  if (image) {
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('zdjecia') // Zamień na nazwę Twojego bucketa
      .upload(`zdjecia/${image.name}`, image);
      
    if (uploadError) {
      console.error('Upload error ze zdjeciem:', uploadError);
      return;
    }

    imageUrl = `https://dauinplosqiuedehgmbc.supabase.co/storage/v1/object/public/zdjecia/${image.name}`; // Zamień na nazwę Twojego bucketa
  }

  


    const { data, error } = await supabase
      .from('horse')
      .insert([{ id: parsedId, imie, data_urodzenia: dataUrodzenia, plec, id_wlasciciela, wlasciciel, v, m, mv, kowal, ilosc_posilkow,wielkosc_posilku, posilek, image_url: imageUrl}]);

    if (error) {
      console.error('Error: nie dziala', error);
    } else {
      console.log('Data:', data);
      setId('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imie">Imię:</label>
          <input
            type="text"
            id="imie"
            name="imie"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="data_urodzenia">Data urodzenia:</label>
          <input
            type="date"
            id="data_urodzenia"
            name="data_urodzenia"
            value={dataUrodzenia}
            onChange={(e) => setDataUrodzenia(e.target.value)}
            required
          />
          
        </div>
        <div>
          <label htmlFor="plec">Płeć:</label>
          <select
            id="plec"
            name="plec"
            value={plec}
            onChange={(e) => setPlec(e.target.value)}
            required
          >
            <option value="">Wybierz</option>
            <option value="wałach">wałach</option>
            <option value="ogier">ogier</option>
            <option value="klacz">klacz</option>
          </select>
        </div>
        <div>
        <div>
          <label htmlFor="id_wlasciciela">ID właściciela:</label>
          <input
            type="text"
            id="id_wlasciciela"
            name="id_wlasciciela"
            value={id_wlasciciela}
            onChange={(e) => setIdWlasciciela(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="wlasciciel">Właściciel:</label>
          <input
            type="text"
            id="wlasciciel"
            name="wlasciciel"
            value={wlasciciel}
            onChange={(e) => setWlasciciel(e.target.value)}
            required
          />
        </div>
        <div>
          Rodowód: <br></br>
          <label htmlFor="v">Imie ojca:</label>
          <input
            type="text"
            id="v"
            name="v"
            value={v}
            onChange={(e) => setV(e.target.value)}
            required
          />
        </div> 
        <div>
          <label htmlFor="m">Imie matki:</label>
          <input
            type="text"
            id="m"
            name="m"
            value={m}
            onChange={(e) => setM(e.target.value)}
            required
          />
       
          <label htmlFor="mv">/ </label>
          <input
            type="text"
            id="mv"
            name="mv"
            value={mv}
            onChange={(e) => setMv(e.target.value)}
            required
          />
        </div>            
          <label htmlFor="kowal">Ostatnia wizyta kowala:</label>
          <input
            type="date"
            id="kowal"
            name="kowal"
            value={kowal}
            onChange={(e) => setKowal(e.target.value)}
            required
          />
        </div> 
        Programowanie diety:<br></br>
        <div>
          <label htmlFor="ilosc_posilkow">Ilość posiłków:</label>
          <select
            id="ilosc_posilkow"
            name="ilosc_posilkow"
            value={ilosc_posilkow}
            onChange={(e) => setIloscPosilkow(e.target.value)}
            required
          >
            <option value="">Wybierz</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label htmlFor="wielkosc_posilku">Ilość miarek na posiłek:</label>
          <select
            id="wielkosc_posilku"
            name="wielkosc_posilku"
            value={wielkosc_posilku}
            onChange={(e) => setWielkoscposilku(e.target.value)}
            required
          >
            <option value="">Wybierz</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <label htmlFor="posilek">Skład posiłku:</label>
          <input
            type="text"
            id="posilek"
            name="posilek"
            value={posilek}
            onChange={(e) => setPosilek(e.target.value)}
            required
          />
          <div>
          <label htmlFor="image">Zdjęcie:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg, image/png"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default UserForm;