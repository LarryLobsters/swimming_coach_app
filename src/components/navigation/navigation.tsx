import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '../../../public/LarryLogo.png'
import { linkVariants, navVariants } from '@/components/navigation'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import Image from 'next/image'
import AuthButton from '@/components/AuthButton'

const AnimatedLink = motion(Link)
AnimatedLink.defaultProps = { className: 'hover:text-primary-brand nav-link' }

export function Navigation() {
  return (
    <motion.header
      variants={navVariants}
      initial='hidden'
      animate='visible'
      className='md:flex container fixed inset-x-0 top-0 z-50 items-center justify-between hidden w-full h-32'
    >
      <AnimatedLink href='/' variants={linkVariants} className=''>
        <Image src={Logo} alt='Larry Logo' width={100} height={100} className='' />
      </AnimatedLink>

      <nav className='gap-x-14 flex items-center justify-center text-lg'>
        <AnimatedLink href='/' variants={linkVariants}>
          Calendar
        </AnimatedLink>
        <AnimatedLink href='/#projects' variants={linkVariants}>
          Projects
        </AnimatedLink>
        <AnimatedLink href='/#about' variants={linkVariants}>
          About
        </AnimatedLink>

        <motion.div variants={linkVariants}>
          <AuthButton />
        </motion.div>
        <motion.div variants={linkVariants}>
          <ThemeToggleButton />
        </motion.div>
      </nav>
    </motion.header>
  )
}
