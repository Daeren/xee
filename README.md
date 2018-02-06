[![Codacy][cod_b]][cod_l]

```
npm -g install xee
git clone https://github.com/Daeren/xee.git
```


#### Goals:
1. Low memory usage;
2. Maximum performance;
3. Flexibility;
4. Games.


```javascript
> npm run benchmark


on() x 1: 103.341ms
on() x 1 + [data] x 1: 88.518ms
on() x 2: 117.172ms
on() x 2 + [data] x 1: 130.805ms
^|events|------------------

on() x 1: 103.220ms
on() x 1 + [data] x 1: 80.880ms
on() x 2: 103.022ms
on() x 2 + [data] x 1: 74.249ms
^|eventemitter3|------------------

on() x 1: 57.047ms
on() x 1 + [data] x 1: 53.256ms
on() x 2: 74.014ms
on() x 2 + [data] x 1: 66.940ms
^|xee|------------------
```


##### Packet type

| Name                  | Note                                                             |
|-----------------------|------------------------------------------------------------------|
|                       | -                                                                |
| on(type, listener)    |                                                                  |
| once(type, listener)  |                                                                  |
| off([type, listener]) |                                                                  |
|                       | -                                                                |
| emit(type[, ...args]) |                                                                  |
|                       | -                                                                |
| listenerCount(type)   |                                                                  |


## License

MIT

----------------------------------
[@ Daeren][1]
[@ Telegram][2]


[1]: http://666.io
[2]: https://telegram.me/io666

[cod_b]: https://img.shields.io/codacy/8edf93f21acd4bba8d1acc7eb891235d.svg
[cod_l]: https://www.codacy.com/app/daeren/xee/dashboard
