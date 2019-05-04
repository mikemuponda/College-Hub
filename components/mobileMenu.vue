<template>
	<div style="width: 100%;">
		<div class="menu" v-if="$store.state.authUser">
			<transition name="slide-fade">
				<div class="sideMenu" v-if="show">
					<div class="menu-icons">
						<div class="icon">
							<i class="fas fa-sign-out-alt" @click="logout($store.state.authUser.user)"></i>
						</div>
					</div>
				</div>
			</transition>
			<div class="menuDiv">
				<i class="fas fa-bars" @click="show = !show"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-user"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-comment"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-bell"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-home"></i>
			</div>
		</div>
	</div>
</template>

<script>
import io from 'socket.io-client'
export default {
	data(){
		return {
			show: false,
			userProfile: {},
			errors: [],
			socket: io(process.env.socketsIO),
		}
	},
	methods: {
		async logout(user) {
      this.userProfile = user
      try {
        this.socket.emit('ACTIVITY_FEED_LOGOUT', {user: this.userProfile,})
        this.userProfile = null
				await this.$store.dispatch('logout')
        window.location.href = '/'
      } catch (e) {
        this.errors.push(e)
      }
    },
	}
}
</script>


<style>
.menu{
	width: 100%;
  bottom: 0px;
  position: fixed;
	width: 100%;
	background: #fff;
	border-top: 0.5px solid #ccc;
	height: 50px;
}

.menuDiv{
	float: left;
	width: 20%;
	text-align: center;
	margin-top: 10px;
}

.menuDiv i{
	color: #aaa;
}
.sideMenu{
	position: fixed;
	background: rgba(112, 112, 112, 0.4);
	border: 0.5px solid #eee;
	top: 0px;
	margin-top: 100px;
	border-radius: 0 4px 4px 0;
	height: 350px;
	width: 57px;
	text-align: center;
}

.menu-icons{
	width: 100%;
}

.menu-icons .icon{
	background: rgb(132, 0, 255);
	border-radius: 50%;
	padding: 10px;
	width: 80%;
	margin-left: 10%;
	margin-top: 10px;
}

.menu-icons i{
	color: #fff;
}

.menu-icons i:hover{
	cursor: pointer;
}
</style>
