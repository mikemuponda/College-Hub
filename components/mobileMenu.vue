<template>
	<div style="width: 100%;">
		<div class="menu" v-if="$store.state.authUser">
			<transition name="slide-fade">
				<div class="sideMenu" v-if="show">
					<div class="menu-icons">
							<div class="profileImage" v-if="$store.state.authUser">
								<img
									v-if="$store.state.authUser.user.profileImage"
									title="Profile and Settings"
									:alt="$store.state.authUser.user.firstname + ' ' + $store.state.authUser.user.lastname"
									:src="$store.state.authUser.user.profileImage.path"
									@click="switchUrl('/profile/' + $store.state.authUser.user.username)"
								/>
								<img
									v-else
									title="Profile and Settings"
									:alt="$store.state.authUser.user.firstname + ' ' + $store.state.authUser.user.lastname"
									src="/img/profileImages/user.png"
									@click="switchUrl('/profile/' + $store.state.authUser.user.username)"
								/>
							</div>
						<div class="icon">
							<i class="fas fa-warehouse" @click="switchUrl('/accommodation/')"></i>
						</div>
						<div class="icon">
							<i class="fas fa-taxi" @click="switchUrl('/taxi/')"></i>
						</div>
						<div class="icon">
							<i class="fas fa-hamburger" @click="switchUrl('/restaurants/')"></i>
						</div>
						<div class="icon">
							<i class="fas fa-store" @click="switchUrl('/marketplace/')"></i>
						</div>
						<div class="icon">
							<i class="fas fa-code" @click="switchUrl('/events/')"></i>
						</div>
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
				<i class="fas fa-user" @click="switchUrl('/profile/' + $store.state.authUser.user.username)"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-comment" @click="switchUrl('/messages/')"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-bell" @click="switchUrl('/notifications/')"></i>
			</div>
			<div class="menuDiv">
				<i class="fas fa-home" @click="switchUrl('/')"></i>
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
		switchUrl(newPath){
			window.location.href = newPath
		},
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

.menu .profileImage{
	border-radius: 50%;
	width: 80%;
	height: 45px;
	margin-left: 10%;
	margin-top: 10px;
	background: rgb(132, 0, 255);
	border: 1px solid rgb(132, 0, 255);
	overflow: hidden;
}

.menu .profileImage img{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.menu .profileImage img:hover{
  cursor: pointer;
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
	background: rgba(112, 112, 112, 0.8);
	border: 0.5px solid #eee;
	top: 0px;
	margin-top: 79px;
	border-radius: 0 4px 4px 0;
	height: 75vh;
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
	height: 45px;
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
