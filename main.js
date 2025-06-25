class InviteMissionGame {
    constructor() {
        this.player = {
            x: 50,
            y: 50,
            speed: 5
        };
        
        this.npcs = {
            parent: { invited: false, x: 20, y: 20 },
            friend: { invited: false, x: 80, y: 20 },
            teacher: { invited: false, x: 20, y: 80 },
            colleague: { invited: false, x: 80, y: 80 }
        };
        
        this.keys = {};
        this.gameArea = null;
        this.playerElement = null;
        this.currentScreen = 'start';
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupGameArea();
        this.updateProgress();
        this.createParticles();
    }
    
    createParticles() {
        // 배경 파티클 생성
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
        });
    }
    
    setupEventListeners() {
        // 시작 버튼
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('game');
            this.startGame();
        });
        
        // 다짐 제출 버튼
        document.getElementById('submit-promise').addEventListener('click', () => {
            this.submitPromise();
        });
        
        // 다시 시작 버튼
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
        
        // 키보드 이벤트
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            // Enter 키로 초대장 전달
            if (e.key === 'Enter' && this.currentScreen === 'game') {
                this.tryInvite();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }
    
    setupGameArea() {
        this.gameArea = document.getElementById('game-area');
        this.playerElement = document.getElementById('player');
        
        // 게임 영역 크기 가져오기
        const rect = this.gameArea.getBoundingClientRect();
        this.gameAreaWidth = rect.width;
        this.gameAreaHeight = rect.height;
        
        // 플레이어 초기 위치 설정 (화면 중앙)
        this.player.x = this.gameAreaWidth / 2;
        this.player.y = this.gameAreaHeight / 2;
        this.updatePlayerPosition();
        
        // 디버깅을 위한 로그
        console.log('Game area size:', this.gameAreaWidth, 'x', this.gameAreaHeight);
        console.log('Player initial position:', this.player.x, this.player.y);
    }
    
    showScreen(screenName) {
        // 모든 화면 숨기기
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 해당 화면 보이기
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
        
        // 화면 전환 효과
        if (screenName === 'party') {
            this.createPartyEffects();
        }
    }
    
    createPartyEffects() {
        // 파티 효과 생성
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 100);
        }
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            animation: confettiFall 3s linear forwards;
            z-index: 1000;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
    
    startGame() {
        // 게임 시작 시 플레이어 위치 재설정
        this.setupGameArea();
        this.gameLoop();
    }
    
    gameLoop() {
        if (this.currentScreen !== 'game') return;
        
        this.handlePlayerMovement();
        this.checkCollisions();
        this.updateParticles();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    handlePlayerMovement() {
        const moveSpeed = this.player.speed;
        
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
            this.player.x = Math.max(30, this.player.x - moveSpeed);
        }
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
            this.player.x = Math.min(this.gameAreaWidth - 30, this.player.x + moveSpeed);
        }
        if (this.keys['ArrowUp'] || this.keys['w'] || this.keys['W']) {
            this.player.y = Math.max(30, this.player.y - moveSpeed);
        }
        if (this.keys['ArrowDown'] || this.keys['s'] || this.keys['S']) {
            this.player.y = Math.min(this.gameAreaHeight - 30, this.player.y + moveSpeed);
        }
        
        this.updatePlayerPosition();
    }
    
    updatePlayerPosition() {
        if (this.playerElement) {
            this.playerElement.style.left = `${this.player.x - 30}px`;
            this.playerElement.style.top = `${this.player.y - 30}px`;
        }
    }
    
    checkCollisions() {
        // NPC와의 충돌 체크는 tryInvite에서 처리
    }
    
    tryInvite() {
        const playerRect = {
            x: this.player.x - 30,
            y: this.player.y - 30,
            width: 60,
            height: 60
        };
        
        // 디버깅: 플레이어 위치 출력
        console.log('Player position:', this.player.x, this.player.y);
        console.log('Player rect:', playerRect);
        
        Object.keys(this.npcs).forEach(npcKey => {
            const npc = this.npcs[npcKey];
            if (npc.invited) return;
            
            // CSS 위치에 맞춰 NPC 위치 계산
            let npcX, npcY;
            
            switch(npcKey) {
                case 'parent':
                    npcX = this.gameAreaWidth * 0.2; // left: 20%
                    npcY = this.gameAreaHeight * 0.2; // top: 20%
                    break;
                case 'friend':
                    npcX = this.gameAreaWidth * 0.8; // right: 20% -> left: 80%
                    npcY = this.gameAreaHeight * 0.2; // top: 20%
                    break;
                case 'teacher':
                    npcX = this.gameAreaWidth * 0.2; // left: 20%
                    npcY = this.gameAreaHeight * 0.8; // bottom: 20% -> top: 80%
                    break;
                case 'colleague':
                    npcX = this.gameAreaWidth * 0.8; // right: 20% -> left: 80%
                    npcY = this.gameAreaHeight * 0.8; // bottom: 20% -> top: 80%
                    break;
                default:
                    return;
            }
            
            // 더 관대한 충돌 범위 (80px x 80px)
            const npcRect = {
                x: npcX - 40,
                y: npcY - 40,
                width: 80,
                height: 80
            };
            
            // 디버깅: NPC 위치 출력
            console.log(`NPC ${npcKey} position:`, npcX, npcY);
            console.log(`NPC ${npcKey} rect:`, npcRect);
            
            // 충돌 체크
            if (this.isColliding(playerRect, npcRect)) {
                console.log(`Collision detected with ${npcKey}!`);
                this.inviteNPC(npcKey);
            }
        });
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    inviteNPC(npcKey) {
        if (this.npcs[npcKey].invited) return;
        
        this.npcs[npcKey].invited = true;
        
        // NPC 요소에 invited 클래스 추가
        const npcElement = document.getElementById(`npc-${npcKey}`);
        if (npcElement) {
            npcElement.classList.add('invited');
        }
        
        // 축하 메시지 표시
        this.showInviteMessage(npcKey);
        
        // 진행률 업데이트
        this.updateProgress();
        
        // 모든 NPC 초대 완료 체크
        if (this.checkAllInvited()) {
            setTimeout(() => {
                this.showPartyScreen();
            }, 1000);
        }
    }
    
    showInviteMessage(npcKey) {
        const messages = {
            parent: "🎉 부모님께 초대장을 전달했습니다! 🎉",
            friend: "🎉 친구에게 초대장을 전달했습니다! 🎉",
            teacher: "🎉 선생님께 초대장을 전달했습니다! 🎉",
            colleague: "🎉 동료에게 초대장을 전달했습니다! 🎉"
        };
        
        // 임시 메시지 표시
        const message = document.createElement('div');
        message.textContent = messages[npcKey];
        message.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 20px 30px;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 100;
            animation: messagePop 2s ease-in-out;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.3);
        `;
        
        document.getElementById('game-area').appendChild(message);
        
        // 축하 효과 생성
        this.createCelebrationEffects();
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
    
    createCelebrationEffects() {
        // 축하 파티클 효과
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 4)]};
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    animation: particleExplode 1s ease-out forwards;
                    z-index: 99;
                `;
                document.getElementById('game-area').appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }, i * 100);
        }
    }
    
    updateProgress() {
        const invitedCount = Object.values(this.npcs).filter(npc => npc.invited).length;
        document.getElementById('invite-count').textContent = invitedCount;
        
        // 진행률에 따른 색상 변화
        const progressElement = document.getElementById('progress');
        if (invitedCount === 4) {
            progressElement.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
            progressElement.style.animation = 'progressComplete 1s ease-in-out infinite';
        }
    }
    
    checkAllInvited() {
        return Object.values(this.npcs).every(npc => npc.invited);
    }
    
    showPartyScreen() {
        this.showScreen('party');
    }
    
    submitPromise() {
        const promiseText = document.getElementById('promise-input').value.trim();
        
        if (promiseText === '') {
            alert('다짐을 입력해주세요!');
            return;
        }
        
        // 결과 화면에 다짐 표시
        document.getElementById('user-promise').textContent = promiseText;
        
        // 결과 화면으로 전환
        this.showScreen('result');
    }
    
    restartGame() {
        // 게임 상태 초기화
        this.player.x = this.gameAreaWidth / 2;
        this.player.y = this.gameAreaHeight / 2;
        
        Object.keys(this.npcs).forEach(npcKey => {
            this.npcs[npcKey].invited = false;
            const npcElement = document.getElementById(`npc-${npcKey}`);
            if (npcElement) {
                npcElement.classList.remove('invited');
            }
        });
        
        // 입력 필드 초기화
        document.getElementById('promise-input').value = '';
        
        // 진행률 초기화
        this.updateProgress();
        
        // 시작 화면으로 돌아가기
        this.showScreen('start');
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes messagePop {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes particleExplode {
        0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(0);
        }
        50% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0);
        }
    }
    
    @keyframes confettiFall {
        0% { 
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% { 
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes progressComplete {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new InviteMissionGame();
}); 