/**
 * 歌曲Action Creator
 */

export const getSongs = (songs) => ({
  type: 'GET_SONGS',
  list: songs,
  playIndex: 0,
  playVisible: false,
  playSound: 35,
  playModel: 0,
  playProgress: 0
});

export const modifySongPlayIndex = (playIndex) => ({
  type: 'MODIFY_SONG_PLAY_INDEX',
  playIndex
});

export const modifySongPlayVisible = (playVisible) => ({
  type: 'MODIFY_SONG_PLAY_VISIBLE',
  playVisible
});

export const modifySongPlaySound = (playSound) => ({
  type: 'MODIFY_SONG_PLAY_SOUND',
  playSound
});

export const modifySongPlayModel = (playModel) => ({
  type: 'MODIFY_SONG_PLAY_MODEL',
  playModel
});

export const modifySongPlayProgress = (playProgress) => ({
  type: 'MODIFY_SONG_PLAY_PROGRESS',
  playProgress
});

/*
  bindActionCreators:产生动作对象
  接收一个actionCreators(action创建器对象)，和dispatch
  内部通过科里化，将actionCreator和dispatch缓存起来，返回的新函数接收调用的参数，在新函数中调用dispatch(actionCreator(参数))

  React是一个View框架，内部提供了状态机用来管理View的状态和动作，使用JSX来清晰的描述组件的内部结构和CSS Modules对CSS进行模块化管理
  通过传递Props来改变View的属性和初始化状态，通过setState改变组件状态产生虚拟DOM,利用高效的diff算法实现View渲染
  不足点：如果View的状态依赖的祖先的层级越深，props需要传递的也越深，状态依赖不明容易造成混乱

  Redux是用来统一管理View的状态的库，提供了一个Store用来管理应用所有的依赖状态，保证状态的存储，监听State变化并且重新渲染View的方法，还有触发改变State的指令
  使用了Action描述状态改变的动作对象，包括动作的类型和状态改变需要的数据
  使用了Ruducer来改变状态

  Webpack模块打包工具
    内部首先对入口文件以及所有引入的模块及子模块进行静态分析，静态分析支持智能的动态路径，得到的各个模块的依赖和类型
    根据类型调用不同的loader进行编译，编译完成后，打包到output指定的path中，名字使用filename
    如果配置文件中包括插件，比如创建自动引用输出目录的静态资源的HTML文件的HtmlWebpackPlugin和进行代码分割的CommonsChunkPlugin等插件，等打包完成后，在用这些插件做最后的处理
    注意：
      在css中如果引用了图片或者其他css,那么最终通过css-loader编译后的路径就是publicPath + css-loader中用name声明的路径
      对一些第三方的模块或者不经常改动的模块，做代码分割，并且将webpack
    好处：
      对CommonJS、Amd、ES6 Module做了兼容处理
      使用代码书写配置文件，扩展性更高
      对依赖资源进行编译，打包，由于发生在开发阶段，避免线上引用编译器和其他模块造成的http请求过多
      对样式、图片、字体等类型的文件进行打包，更易于组件化的实现

*/
